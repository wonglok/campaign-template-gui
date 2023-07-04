import * as THREE from 'three'
import { CustomGPU } from './GPU'
import { useCore } from 'agape-sdk/src/Canvas/AgapeNode/Runtime/useCore'
import { useEffect, useState } from 'react'
import displayFrag from './display.frag'
import displayVert from './display.vert'
import computeFrag1 from './compute.frag'
import { useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler'

let GPUComputationRenderer = CustomGPU

let makeSpikesAPI = async (api, { geo, computeFrag }) => {
  let { renderer } = api
  let object = {}

  function prepIndexer(texture, SIZE) {
    let pixels = texture.image.data
    let p = 0
    let max = SIZE * SIZE
    for (let j = 0; j < max; j++) {
      pixels[p + 0] = j
      pixels[p + 1] = j / max
      pixels[p + 2] = SIZE
      pixels[p + 3] = 1.0
      p += 4
    }
  }

  function prepAGAPE(texture, SIZE) {
    let pixels = texture.image.data
    let p = 0
    let max = SIZE * SIZE

    let builder = new MeshSurfaceSampler(new THREE.Mesh(geo))
    builder.build()

    let p3 = new THREE.Object3D()
    p3.normal = new THREE.Vector3()
    for (let j = 0; j < max; j++) {
      builder.sample(p3.position, p3.normal)
      pixels[p + 0] = p3.position.x
      pixels[p + 1] = p3.position.y
      pixels[p + 2] = p3.position.z
      pixels[p + 3] = 1.0
      p += 4
    }

    texture.needsUpdate = true
  }

  let ticker = 0
  let SIZE = 128

  let gpuCompute = new GPUComputationRenderer(SIZE, SIZE / 2, renderer)

  let indexerTexture = gpuCompute.createTexture()
  let agapeLogoPositiontexture = gpuCompute.createTexture()

  prepAGAPE(agapeLogoPositiontexture, SIZE)

  prepIndexer(indexerTexture, SIZE)

  let pingTarget = gpuCompute.createRenderTarget()
  let pongTarget = gpuCompute.createRenderTarget()

  let pingMat, pongMat
  let mouseV3 = new THREE.Vector3(0.0, 0.0, 0.0)

  let initPingPong = ({ pingPongShader }) => {
    try {
      let newPingMat = gpuCompute.createShaderMaterial(pingPongShader, {
        lastTexture: { value: null },
        indexerTexture: { value: indexerTexture },
        time: { value: 0 },
        mouse: { value: mouseV3 },
        startPos: { value: agapeLogoPositiontexture },
      })
      let newPongMat = gpuCompute.createShaderMaterial(pingPongShader, {
        lastTexture: { value: null },
        indexerTexture: { value: indexerTexture },
        time: { value: 0 },
        mouse: { value: mouseV3 },
        startPos: { value: agapeLogoPositiontexture },
      })
      pingMat = newPingMat
      pongMat = newPongMat
    } catch (e) {
      console.error(e)
    }
  }

  initPingPong({ pingPongShader: computeFrag })

  // sim part
  let procSim = () => {
    pingMat.uniforms.lastTexture.value = pongTarget.texture
    pongMat.uniforms.lastTexture.value = pingTarget.texture

    pingMat.uniforms.time.value = window.performance.now() * 0.0001
    pongMat.uniforms.time.value = window.performance.now() * 0.0001
  }
  let mainColor = new THREE.Color('#FCACBB') //.set('#00ffff')

  let tCube = null // makeCubeTexture(api)
  // let tCube = await env.getAnyCode('canvas-texture', 'main').run(api)

  // display part
  let geometry = new THREE.PlaneBufferGeometry(1.0, 1.0, SIZE - 1, SIZE - 1)
  let makeMaterial = () => {
    let rect = renderer.domElement.getBoundingClientRect()
    let displayV = displayVert
    let displayF = displayFrag

    return new THREE.ShaderMaterial({
      // blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      vertexShader: displayV,
      fragmentShader: displayF,
      defines: {
        aspectRatio: `${Number(rect.width / rect.height).toFixed(1)}`,
        resolution: 'vec2( ' + rect.width.toFixed(1) + ', ' + rect.height.toFixed(1) + ' )',
      },
      uniforms: {
        mainColor: { value: mainColor },

        time: { value: 0 },
        opacity: { value: 1.0 },
        posTex: { value: null },

        // tCube: { value: tCube },

        indexerTexture: { value: indexerTexture },
        pointSize: { value: window.devicePixelRatio || 1.0 },
      },
    })
  }

  let material = makeMaterial()
  let points = new THREE.Points(geometry, material)

  // env.getCode('display-v').stream(() => {
  //   material = makeMaterial()
  //   points.material = material
  // })
  // env.getCode('display-f').stream(() => {
  //   material = makeMaterial()
  //   points.material = material
  // })

  // var points = ev.points = new THREE.Points(geometry, material)
  // points.matrixAutoUpdate = true
  // points.updateMatrix()
  // points.frustumCulled = false

  object.compute = () => {
    procSim()

    if (ticker % 2 === 0) {
      gpuCompute.doRenderTarget(pongMat, pongTarget)
    } else {
      gpuCompute.doRenderTarget(pingMat, pingTarget)
    }

    if (ticker % 2 === 0) {
      material.uniforms.posTex.value = pongTarget.texture
    } else {
      material.uniforms.posTex.value = pingTarget.texture
    }
    ticker++

    material.uniforms.time.value = window.performance.now() * 0.0001
  }
  object.renderable = points
  object.mouse = mouseV3

  return object
}

let run = async (api, { geo, computeFrag }) => {
  let spikes = await makeSpikesAPI(api, { geo, computeFrag })
  api.onLoop(() => {
    spikes.compute()
  })

  spikes.renderable.position.z = -10
  spikes.renderable.scale.x = 1.5
  spikes.renderable.scale.y = 1.5
  spikes.renderable.scale.z = 1.5

  // api.onLoop(() => {
  //   spikes.mouse.x = api.mouse.x
  //   spikes.mouse.y = api.mouse.y
  // })

  api.onClean(() => {
    spikes.renderable.removeFromParent()
  })
  // let on = {
  //   onTouchStart(ev) {
  //     ev.preventDefault()
  //   },
  //   onTouchMove(ev) {
  //     ev.preventDefault()
  //     const touch = ev.targetTouches[0]
  //     mouse.x = (touch.clientX / window.innerWidth - 0.5) * 2
  //     mouse.y = (1 - touch.clientY / window.innerHeight - 0.5) * 2
  //   },
  //   onMouseMove(ev) {
  //     mouse.x = (ev.clientX / window.innerWidth - 0.5) * 2
  //     mouse.y = (1 - ev.clientY / window.innerHeight - 0.5) * 2
  //   },
  // }

  // api.renderer.domElement.addEventListener('mousemove', on.onMouseMove, { passive: false })
  // api.renderer.domElement.addEventListener('touchstart', on.onTouchStart, { passive: false })
  // api.renderer.domElement.addEventListener('touchmove', on.onTouchMove, { passive: false })

  console.log('installed')

  return spikes
}

export function EnergySpaYo() {
  let glb = useGLTF(`/lok/agape-logo-mesh.glb`)
  let core = useCore()
  let gl = useThree((r) => r.gl)
  let scene = useThree((r) => r.scene)
  let mouse = useThree((r) => r.mouse)
  core.mouse = mouse
  core.renderer = gl
  core.scene = scene

  let [mount, setMount] = useState(null)

  useEffect(() => {
    let geo = false

    glb.scene.traverse((it) => {
      if (!geo && it.geometry) {
        geo = it.geometry
      }
    })
    run(core, { geo: geo, computeFrag: computeFrag1 }).then((spikes) => {
      setMount(<primitive object={spikes.renderable} />)
    })
  }, [])

  return <group scale={1}>{mount}</group>
}

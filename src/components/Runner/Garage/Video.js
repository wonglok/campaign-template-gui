import { useState, useEffect } from 'react'
import { Color, DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry, RepeatWrapping, sRGBEncoding } from 'three'
import { createPortal, useThree } from '@react-three/fiber'
import { useVideoTexture } from '@react-three/drei'

export function Video() {
  let videoTexture = useVideoTexture('/video/compress/redmech-480.mp4', {
    crossOrigin: 'Anonymous',
    loop: true,
    muted: true,
    playsInline: true,
  })
  videoTexture.image.loop = true

  // // Video texture by: https://www.pexels.com/@rostislav/
  // const [video] = useState(() =>
  //   Object.assign(document.createElement('video'), {
  //     src: '/video/redmech-720.mp4',
  //     crossOrigin: 'Anonymous',
  //     loop: true,
  //     muted: true,
  //     playsInline: true,
  //   }),
  // )

  let gl = useThree((s) => s.gl)

  useEffect(() => {
    gl.domElement.onclick = () => {
      videoTexture.image.play()
      videoTexture.needsUpdate = true
    }
    gl.domElement.ontouchstart = () => {
      videoTexture.image.play()
      videoTexture.needsUpdate = true
    }
    return () => {
      gl.domElement.ontouchstart = () => {}
      gl.domElement.onclick = () => {}
    }
  })

  let scene = useThree((r) => r.scene)

  useEffect(() => {
    let tt = setInterval(() => {
      let yo = false

      scene.traverse((it) => {
        if (it.material && it.material.name === 'screen') {
          yo = it
        }
      })

      if (yo) {
        let mat = new MeshBasicMaterial({ name: 'screen', map: videoTexture, side: DoubleSide })
        yo.material = mat
        yo.material.color = new Color('#ffffff')
        yo.material.vertexColors = false
        yo.material.map = videoTexture
        videoTexture.flipY = false
        videoTexture.wrapS = videoTexture.wrapT = RepeatWrapping

        videoTexture.offset.y = -0.45
        videoTexture.repeat.set(1, 1.3)
        yo.scale.set(1, 16 / 9 - 1.0, 1)
        yo.scale.multiplyScalar(1)
        videoTexture.needsUpdate = true

        clearInterval(tt)
      }
    })
    return () => {
      clearInterval(tt)
    }
  }, [scene, videoTexture])
  return (
    <>
      {/* <mesh position={[0, (18 * 9) / 16 / 2, 0]} scale-y={1}>
        <boxBufferGeometry args={[18, (18 * 9) / 16, 0.1]} />
        <meshBasicMaterial toneMapped={false} side={DoubleSide}>
          <videoTexture attach='map' args={[video]} encoding={sRGBEncoding} />
        </meshBasicMaterial>
      </mesh> */}
    </>
  )
}

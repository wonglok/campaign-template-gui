import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useMemo } from 'react'
// import { clone } from 'three/examples/jsm/utils/SkeletonUtils'
import { Color } from 'three'
// import { useFrame } from '@react-three/fiber'

export function Genesis() {
  let gltf = useGLTF(`/assets/2023-03-17-garage-mech/texture-proper-512-compress.glb`)

  let cloned = gltf.scene

  let anim = useAnimations([...gltf.animations], cloned)

  // useFrame((st, dt) => {
  //   // anim.mixer.update(dt)
  // })
  useEffect(() => {
    cloned.traverse((it) => {
      it.frustumCulled = false

      if (it.material) {
        // it.material.envMapIntensity = 2
        it.material.dithering = true
      }
      if (it.name === 'RetopoFlow005') {
        it.material.emissive = new Color('#00ffff')
      }
    })
  })

  useEffect(() => {
    if (!anim.actions.Idle) {
      return
    }

    anim.actions.Idle.play()
  }, [anim.actions.Idle])
  return (
    <>
      {/*  */}
      <group scale={3}>
        <pointLight color={'#00bbff'} position={[0, 1, 1]} intensity={5}></pointLight>
        <primitive object={cloned}></primitive>
      </group>
      {/*  */}
    </>
  )
}

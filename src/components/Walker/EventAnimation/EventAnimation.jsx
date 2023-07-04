import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { AnimationMixer } from 'three'
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'

export function EventAnimation({ url = ``, event, animationIndex = 0 }) {
  let gltf = useGLTF(url)

  let cloned = clone(gltf.scene)
  let gp = useRef()

  let mixer = useRef(new AnimationMixer())

  useFrame((st, dt) => {
    mixer.current.update(dt)
  })

  useEffect(() => {
    if (gltf.animations) {
      let first = gltf.animations[animationIndex]
      if (first) {
        //

        //
        let hh = () => {
          let action = mixer.current.clipAction(first, cloned)
          //
          action.reset()
          action.repetitions = 1
          action.clampWhenFinished = true
          action.play()
        }

        window.addEventListener(event, hh)

        return () => {
          window.removeEventListener(event, hh)
        }
      }
    }
  }, [cloned, event, gltf.animations, animationIndex])

  return (
    <>
      <group ref={gp}>
        <primitive object={cloned}></primitive>
      </group>
    </>
  )
}

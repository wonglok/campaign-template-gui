import { useEffect } from 'react'
import { LoaderGLB } from '../../../main.jsx'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export function ProductView({ useStore }) {
  let colliderGLBURL = useStore((r) => r.colliderGLBURL)
  let gl = useThree((s) => s.gl)

  return (
    <group>
      {colliderGLBURL && (
        <LoaderGLB
          url={`${colliderGLBURL}`}
          decorate={({ glb }) => {
            glb.scene.traverse((it) => {
              if (it.isLight) {
                it.visible = false
              }
            })
          }}
          animate={true}
          WhenDone={function DONE({ glb }) {
            glb.scene.traverse((it) => {
              it.castShadow = true
              it.receiveShadow = true
            })

            useEffect(() => {
              useStore.setState({
                colliderGLBObjectSrc: colliderGLBURL,
              })
            }, [glb])
            return (
              <>
                <OrbitControls
                  object-position={[0, 5, 10]}
                  target={[0, 4, 0]}
                  domElement={gl.domElement}
                  makeDefault
                ></OrbitControls>
                <primitive object={glb.scene}></primitive>
              </>
            )
          }}
        ></LoaderGLB>
      )}
    </group>
  )
}

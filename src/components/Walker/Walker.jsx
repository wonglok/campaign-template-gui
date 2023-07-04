import { Canvas, useThree } from '@react-three/fiber'
import { useStore } from './useStore'
import { Color } from 'three'
import { Background, PPSwitch } from 'agape-sdk/src/main'
import { SceneKit } from '../Runner/SceneKit'
import { GameModeAdapter } from '../Runner/GameModeAdapter'
import { WalkerContent } from './WalkerContent'
export function Walker() {
  return (
    <>
      <Canvas
        onCreated={(st) => {
          st.gl.useLegacyLights = true
          st.gl.physicallyCorrectLights = true
          st.gl.domElement.ontouchstart = (ev) => {
            ev.preventDefault()
          }
          st.gl.domElement.ontouchmove = (ev) => {
            ev.preventDefault()
          }
          st.camera.near = 0.5
          st.camera.far = 500
          st.camera.updateProjectionMatrix()
        }}
      >
        <PPSwitch useStore={useStore}></PPSwitch>
        <group
          onClick={(e) => {
            console.log(e?.object?.name)
            window.dispatchEvent(new CustomEvent(e.object.name, { detail: e.object.name }))
          }}
        >
          <GameModeAdapter useStore={useStore}></GameModeAdapter>
        </group>
        <SceneKit useStore={useStore}></SceneKit>
        <Background useStore={useStore}></Background>
        <BGColor></BGColor>

        <WalkerContent></WalkerContent>
      </Canvas>

      <div id='guilayer'></div>
    </>
  )
}

function BGColor() {
  //
  let scene = useThree((r) => r.scene)
  scene.background = new Color('#000000')
  return null
}

'use client'

import { Canvas, useThree } from '@react-three/fiber'
// import { LoaderGLB, SceneStateManager } from 'agape-sdk'
// import { Loader } from '../Loader/Loader'
import { Background, LoaderGLB, PPSwitch } from 'agape-sdk'
// import { GameModeAdapter } from './GameModeAdapter'
import { SceneKit } from './SceneKit'
// import { PPSwitch } from 'agape-sdk'
import { Joystick } from 'agape-sdk'
// import { AgapeNodeRuntime } from 'agape-sdk'
// import { OfflineLoader } from '../Loader/OfflineLoader'
// import { useMic } from '../mic/mic'
// import { MyBG } from './MyBG'
// import { Card } from './Card'
// import { Box, OrbitControls, Sphere, useGLTF } from '@react-three/drei'
import { HologramV7Content } from '../Hologram/HologramV7'
import { useStore } from './useStore'
import { GameModeAdapter } from './GameModeAdapter'
import holoState, { holoJsonUrl, holoPosterUrl, holoVideoUrl } from './holoState'
import { ReadyPlayerMe } from './ReadyPlayerMe'
import { CameraFinger, CameraMenu, CameraMenu3D, FingerDetection } from '../HandGame/NoodleCamera/CameraFinger'
import { ParticleRelay } from '../HandGame/NoodleCamera/EnergyCollectionGame/ParticleEngine/CoreEngine'
import { useEffect, useState } from 'react'
import { Box, OrbitControls, PerspectiveCamera, Sphere } from '@react-three/drei'
import { YoContent } from './YoContent'
import { Loader } from '../Loader/Loader'
import { Color, Fog } from 'three'
import { LandingPageBallGarage } from './Garage/LandingPageBallGarage'
import { OfflineLoader } from '../Loader/OfflineLoader'
import { Zoomer } from './Zoomer'
//
//
// import { EnergySpa } from '../EnergySpa/EnergySpa'
//
//

function BGColor() {
  //
  let scene = useThree((r) => r.scene)
  scene.background = new Color('#000000')
  return null
}

export function Runner({}) {
  return (
    <div className='h-full w-full'>
      <Compos></Compos>
    </div>
  )
}

function Compos() {
  // let ready = useStore((r) => r.ready)
  return (
    <>
      <OfflineLoader useStore={useStore}></OfflineLoader>

      {/* <Loader projectID={`_4b44586dda4f73c320d2eecef3bf5a03`} useStore={useStore}></Loader> */}

      {
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
          }}
        >
          <fog attach='fog' args={['#000000', 50, 100]}></fog>
          {
            <>
              <group>
                <PerspectiveCamera fov={60} near={1} far={300} makeDefault></PerspectiveCamera>

                <OrbitControls
                  // minAzimuthAngle={-0.25}
                  // maxAzimuthAngle={2}
                  // minPolarAngle={0.5}
                  // maxPolarAngle={1.5}
                  // maxDistance={50.0}
                  // minDistance={1}
                  // enablePan={false}
                  makeDefault
                  object-position={[15.948778017120333, 5.751514605909446, 38.55591664683408]}
                  // target={[2.2237790331413985, 0.9691072529250618, 16.89630732147542]}
                  target={[-5.4823505627625915, 5, 6.724015281840656]}
                ></OrbitControls>

                <Zoomer></Zoomer>

                <PPSwitch useStore={useStore}></PPSwitch>

                <YoContent></YoContent>

                <LandingPageBallGarage></LandingPageBallGarage>

                <group
                  onClick={(ev) => {
                    console.log(ev.point.toArray())
                  }}
                >
                  <LoaderGLB
                    url={`/assets/2023-06-30-garage/clean-v3-r512.glb`}
                    decorate={({ glb }) => {
                      glb.scene.traverse((it) => {
                        if (it.isLight) {
                          it.visible = false
                        }
                      })
                    }}
                    animate={true}
                    WhenDone={({ glb }) => {
                      return (
                        <>
                          <primitive object={glb.scene}></primitive>
                        </>
                      )
                    }}
                  ></LoaderGLB>
                </group>

                <group
                  onClick={(ev) => {
                    console.log(ev.object?.material?.name, ev.point.toArray())
                  }}
                >
                  {/* <GameModeAdapter useStore={useStore}></GameModeAdapter> */}
                </group>

                {/* <SceneKit useStore={useStore}></SceneKit> */}
                <Background useStore={useStore}></Background>
                <BGColor></BGColor>
                {/* <AgapeNodeRuntime useStore={useStore}></AgapeNodeRuntime> */}
                {/* <Yo useStore={useStore}></Yo> */}
              </group>
            </>
          }
        </Canvas>
      }

      {/* <CameraMenu></CameraMenu> */}

      <div id='guilayer'></div>

      {/* {ready && <JoyStickHTML useStore={useStore}></JoyStickHTML>} */}

      {/* <Authoriser useStore={useStore}></Authoriser> */}

      {/* <div className=' absolute bottom-0 left-0 m-5 w-20 rounded-full bg-white bg-opacity-80 p-3 backdrop-blur-2xl'>
        <a href={`https://wa.me/93031049`} target='_blank'>
          <img src={`/bear/whatsapp@1x.png`} />
        </a>
        <a href={`https://www.linkedin.com/in/bearng/`} target='_blank'>
          <img src={`/bear/linkedin@1x.png`} />
        </a>
      </div> */}

      <div className=' absolute bottom-0 right-0 m-5 w-32 rounded-full bg-white bg-opacity-80 p-3 backdrop-blur-2xl'>
        <a href={`https://agape-studio.reunite.digital/`} target='_blank'>
          <img src={`/bear/Agape_logo-transp.png`} />
        </a>
      </div>
    </>
  )
}

function JoyStickHTML({ useStore }) {
  let gameMode = useStore((r) => r.gameMode)
  return <>{gameMode === 'room' && <Joystick></Joystick>}</>
}

// function OnlyDesktop({ children }) {
//   let [show, setShow] = useState(false)

//   useEffect(() => {
//     if ('ontouchstart' in window) {
//       setShow(false)
//     } else {
//       setShow(true)
//     }
//   }, [])

//   return <group>{show && children}</group>
// }

// function Authoriser({ useStore }) {
//   let MicTexture = useMic((r) => r.MicTexture)
//   let ready = useStore((r) => r.ready)

//   return (
//     <>
//       {!ready && (
//         <div className=' absolute left-0 top-0 flex h-full w-full items-center justify-center'>
//           <button
//             className='rounded-2xl bg-white p-5'
//             onClick={() => {
//               useStore.setState({ ready: true })
//               // authorise()
//             }}
//           >
//             Loading...
//           </button>
//         </div>
//       )}
//     </>
//   )
// }

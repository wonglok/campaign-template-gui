// import { OrbitControls } from '@react-three/drei'
// import { CameraFinger, CameraMenu3D, FingerDetection } from '../HandGame/NoodleCamera/CameraFinger'
// import { ParticleRelay } from '../HandGame/NoodleCamera/EnergyCollectionGame/ParticleEngine/CoreEngine'
// import { HologramV7Content } from '../Hologram/HologramV7'
import { ReadyPlayerMe } from './ReadyPlayerMe'
// import { holoGUIConfig, holoJsonUrl, holoPosterUrl, holoVideoUrl } from './holoState'
import { EnergySpa } from '../EnergySpa/EnergySpa'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { EnergySpaYo } from '../EnergySpaYo/EnergySpaYo'
import { LoopThroughHolograms } from '../Hologram/HologramV7'
import { LandingPageBallGarage } from './Garage/LandingPageBallGarage'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

export function YoContent() {
  let lookAt = useRef()
  useFrame(({ scene, camera }) => {
    if (lookAt.current) {
      lookAt.current.lookAt(camera.position)
    }

    let Icosphere = scene.getObjectByName('Icosphere')
    if (Icosphere) {
      Icosphere.visible = false
    }
  })

  // useFrame(({ camera }) => {
  //   console.log(camera.position.toArray())
  // })
  //
  return (
    <>
      <group position={[2.270865829958503 - 0.5, 0.9691072529250633, 17.114943617439643 - 1]} scale={1}>
        <group scale={[1, 1, 1]}>
          <group position={[1, 1.1, 0]}>
            {/*  */}

            <LoopThroughHolograms></LoopThroughHolograms>

            <group
              position={[0, 0, 0]}
              userData={{
                forceSize: 3 * 0.5,
                forceTwist: 3.141592 * 2.0 * 2.8,
                forceType: 'vortexX',
                type: 'ForceField',
              }}
            >
              {/* <pointLight intensity={1.5}></pointLight> */}
            </group>
          </group>
        </group>
      </group>

      <group ref={lookAt} scale={0.65} position={[-9.342038943110493, 5, 1.9444370069789163]}>
        {/* <EnergySpa></EnergySpa> */}
        <EnergySpaYo></EnergySpaYo>
      </group>

      <group position={[2.5588974457260356, -1.0893175103330916e-15, 1.8685958102783289]}>
        <group scale={1}>{/* <ReadyPlayerMe></ReadyPlayerMe> */}</group>

        {/* <group position={[0, 0, 2]}>
          <group position={[0, 0, 0]}>
            <CameraMenu3D></CameraMenu3D>
          </group>
        </group> */}
      </group>

      {/* <group position={[0, 0, 0]}>
        <CameraFinger></CameraFinger>
        <FingerDetection></FingerDetection>
        <ParticleRelay></ParticleRelay>
      </group> */}
    </>
  )
}

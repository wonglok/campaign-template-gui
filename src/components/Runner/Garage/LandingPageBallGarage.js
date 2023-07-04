// import { UIContent } from '@/vfx-core/UIContent'
// import { ClosetBtns } from '../game-parts/ClosetBtns'
// import { UIContent } from '@/vfx-core/UIContent'
// import { UIContent } from '@/vfx-core/UIContent'
import {
  Box,
  Cloud,
  // ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  // Scroll,
  // ScrollControls,
} from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { DoubleSide } from 'three'
// import { CameraShakeer } from 'vfx-agape/landing/CameraShakeer'
// import { RedMech } from 'vfx-agape/landing/RedMech'
import { Video } from './Video'
import { BG } from './BG'
// import { Floor } from '../game-parts/Floor'
// import { HDR } from '../game-parts/HDR'
// import { Effects } from '../game-vfx/Effects'
import { MechGarage } from './MechGarage'
import { Genesis } from './Genesis'
import { Zoomer } from '../Zoomer'
// import { Suspense } from 'react'
// import { Genesis } from 'vfx-agape/Mech/Genesis'
// import { ARBG } from '../game-parts/ARBG'
// import { useFrame, useThree } from '@react-three/fiber'
// // import { useEffect } from 'react'
// import { BG } from '../game-parts/BG'
// import { Floor } from '../game-parts/Floor'
// import { HDR } from '../game-parts/HDR'
// import { Player } from '../game-parts/Player'
// import { TopLeft } from '../game-parts/TopLeft'
// import { EnvLight } from '../game-vfx/EnvLight'
// import { Foo } from '../landing/Foo'
// import { Effects } from '../game-vfx/Effects'
// import { EnvLight } from '../game-vfx/EnvLight'
// import { EffectButton } from '../online/EffectButton'
// import { OnlineSystem } from '../online/OnlineSystem'

export function LandingPageBallGarage() {
  // let camera = useThree((s) => s.camera)
  // let viewport = useThree((s) => s.viewport)
  // let portmax = Math.max(viewport.width, viewport.height)

  useEffect(() => {
    //
    document.body.style.backgroundColor = 'black'
  })

  useFrame(({ scene }) => {
    scene.traverse((it) => {
      if (it.material) {
        it.material.envMapIntensity = 0.05
        it.material.emissiveIntensity = 3.5
      }
    })
  })

  // useFrame(({ camera }) => {
  //   console.log({
  //     object: {
  //       position: camera.position.toArray(),
  //       quaternion: camera.quaternion.toArray(),
  //     },
  //   })
  // })

  return (
    <group>
      {/* <RedMech></RedMech> */}
      <group scale={0.5} position={[0, 0.21, -4]}>
        <Genesis></Genesis>
      </group>

      {/* <ContactShadows
        opacity={1}
        scale={5}
        blur={5}
        far={10}
        resolution={64}
        color='#000000'
        position={[0, -0.05, 0]}
      ></ContactShadows> */}

      <Video></Video>
      {/* <group rotation={[0, Math.PI * -0.15, 0]} scale={0.5} position={[10, 0.1, -2]}></group> */}

      {/* <Box args={[500, 500, 0.1]} position={[0, 0, -10]}>
        <meshPhysicalMaterial
          roughness={0.3}
          metalness={0.1}
          side={DoubleSide}
          color='#00ffff'
          emissive='#000000'
          envMapIntensity={5 * 0.0}
        ></meshPhysicalMaterial>
      </Box> */}

      {/* <Box args={[500, 0.1, 500]} position={[0, -0.05, 0]}>
        <meshPhysicalMaterial
          roughness={0.0}
          metalness={0.0}
          side={DoubleSide}
          color='#007755'
          emissive='#000000'
          envMapIntensity={5 * 0.0}
        ></meshPhysicalMaterial>
      </Box> */}

      <MechGarage></MechGarage>
      {/* <BG url={`/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`}></BG> */}

      {/* <group position={[0, 3, -3]}>
        <Cloud></Cloud>
      </group> */}

      {/* <ScrollControls
        pages={3} // Each page takes 100% of the height of the canvas
        distance={1} // A factor that increases scroll bar travel (default: 1)
        damping={4} // Friction, higher is faster (default: 4)
        horizontal={false} // Can also scroll horizontally (default: false)
        infinite={false} // Can also scroll infinitely (default: false)
      >
        <Scroll>
        </Scroll>
        <Scroll html></Scroll>
      </ScrollControls> */}
      {/*
      <UIContent>
        <div className='relative w-screen h-screen'>
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-40 px-6 py-2 pb-4 mt-2 bg-gray-100 rounded-full bg-opacity-10 backdrop-blur-lg'>
              <img className='mt-3' src='/img/agape_logo.png' />
            </div>
          </div>
        </div>
      </UIContent> */}

      {/* <Effects></Effects> */}
      {/* <EnvLight></EnvLight> */}
      {/* <HDR url={`/hdr/BROADWAY_LAFAYETTE_STATION_2.hdr`}> </HDR> */}

      {/* <Floor url={'/scene/landing/os-effect.glb'}></Floor> */}
      {/*
      <Suspense fallback={null}>
        <Floor url={'/scene/landing/os-effect.glb'}></Floor>

        <OnlineSystem mapID='/scene/landing/os.glb'>
          <>
            <Player></Player>
          </>
        </OnlineSystem>
      </Suspense>
      <ARBG></ARBG>
      <Suspense fallback={null}>
        <group position={[0, 0, -3]}>
          <Genesis></Genesis>
        </group>
      </Suspense>
      <TopLeft>
        <EffectButton></EffectButton>
      </TopLeft>
      */}
    </group>
  )
}

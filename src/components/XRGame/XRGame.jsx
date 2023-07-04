import { Canvas } from '@react-three/fiber'
import { Game } from './Game/Game'
import { Controllers, Hands, ARButton, XR, Interactive } from '@react-three/xr'
import { Box } from '@react-three/drei'

export function XRGame() {
  return (
    <>
      <div className='flex h-full select-none items-center justify-between'>
        <Canvas className='h-full select-none'>
          <XR>
            <Controllers />
            <Hands />
            <Game></Game>
          </XR>
        </Canvas>
        <ARButton />
      </div>
    </>
  )
}

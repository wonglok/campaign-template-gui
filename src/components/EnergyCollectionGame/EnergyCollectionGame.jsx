import { Box, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Game } from './Game/Game'

export function EnergyCollectionGame() {
  return (
    <>
      <div className='flex h-full select-none items-center justify-between'>
        <Canvas className='h-full select-none'>
          <Game></Game>
        </Canvas>
      </div>
    </>
  )
}

import { Box, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { ParticleRelay } from '../ParticleEngine/CoreEngine'
import { RayGrab } from '@react-three/xr'

export function Game() {
  return (
    <>
      {/* <OrbitControls enablePan={true} makeDefault></OrbitControls> */}
      <ParticleRelay />
      <PerspectiveCamera fov={25} makeDefault position={[0, 0, 30]}></PerspectiveCamera>
      <Environment files={`/lok/shanghai.hdr`}></Environment>
      <directionalLight position={[10, 10, 10]} color={'#00ffff'}></directionalLight>
    </>
  )
}

//

//

//

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function MechGarage() {
  //apps/frontend/public/assets/2023-03-17-garage-mech/garage.glb

  let gltf = useGLTF(`/assets/2023-03-17-garage-mech/v6-4k-v1.glb`)

  useFrame((st, dt) => {
    gltf.scene.traverse((it) => {
      if (it.name.indexOf('move_x_') === 0 && !it.userData.done) {
        it.userData.done = true
        it.material = it.material.clone()
        it.material.map = it.material.map.clone()
        it.material.normalMap = it.material.normalMap.clone()
        it.material.roughnessMap = it.material.roughnessMap.clone()
        it.material.metalnessMap = it.material.metalnessMap.clone()
      }
    })

    gltf.scene.traverse((it) => {
      if (it.name.indexOf('move_x_') === 0) {
        // it.material.map.rotation += dt * 0.1
        it.material.map.offset.x += dt * 0.1
        it.material.normalMap.offset.x += dt * 0.1
        it.material.roughnessMap.offset.x += dt * 0.1
        it.material.metalnessMap.offset.x += dt * 0.1
      }
    })

    gltf.scene.traverse((it) => {
      if (it.material) {
        it.material.emissiveIntensity = 5
        it.material.dithering = true
      }
    })
  })

  //
  return (
    <group>
      <primitive object={gltf.scene} />
    </group>
  )
}

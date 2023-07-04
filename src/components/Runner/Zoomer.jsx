import { Box, Cylinder, MeshDiscardMaterial } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import anime from 'animejs'
import { Vector3 } from 'three'
// import { useFinger } from '../HandGame/NoodleCamera/useFinger'

export function Zoomer() {
  let controls = useThree((r) => r.controls)

  return (
    <>
      <Box
        name='btn_garage'
        args={[10, 6, 13]}
        position={[0, 1, -2.5]}
        onClick={(ev) => {
          console.log(ev.object)
          let world = new Vector3()

          ev.object.getWorldPosition(world)

          anime({
            targets: [controls.target],
            x: world.x,
            y: world.y,
            z: world.z,
            duration: 700,
            easing: 'easeInOutQuad',
            update: () => {
              controls.update()
            },
          })
          anime({
            targets: [controls.object.position],
            x: world.x + 5,
            y: world.y + 5,
            z: world.z + 20,
            duration: 700,
            easing: 'easeInOutQuad',
            update: () => {
              controls.update()
            },
            complete: () => {},
          })
        }}
      >
        <MeshDiscardMaterial></MeshDiscardMaterial>
      </Box>

      <Box
        name='btn_screen'
        args={[1, 20, 20]}
        position={[-12.011149366544318, 4.191041416994746, 15.361922231806494]}
        onClick={(ev) => {
          console.log(ev.object)
          let world = new Vector3()

          ev.object.getWorldPosition(world)

          anime({
            targets: [controls.target],
            x: world.x,
            y: world.y,
            z: world.z,
            duration: 700,
            easing: 'easeInOutQuad',
            update: () => {
              controls.update()
            },
          })

          anime({
            targets: [controls.object.position],
            x: world.x + 23,
            y: world.y + 3,
            z: world.z + 6,
            duration: 700,
            easing: 'easeInOutQuad',
            update: () => {
              controls.update()
            },
            complete: () => {},
          })
        }}
      >
        <MeshDiscardMaterial></MeshDiscardMaterial>
      </Box>

      <Box
        name='btn_agape'
        args={[8, 8, 8]}
        position={[-9.790583050650856, 4, 1.691805625414429]}
        onClick={(ev) => {
          // console.log(ev.object)
          let world = new Vector3()

          ev.object.getWorldPosition(world)

          anime({
            targets: [controls.target],
            x: world.x,
            y: world.y,
            z: world.z,
            duration: 700,
            easing: 'easeInOutQuad',
            update: () => {
              controls.update()
            },
          })

          anime({
            targets: [controls.object.position],
            x: world.x + 20,
            y: world.y + 3,
            z: world.z + 20,
            duration: 700,
            easing: 'easeInOutQuad',
            update: () => {
              controls.update()
            },
            complete: () => {},
          })
        }}
      >
        <MeshDiscardMaterial></MeshDiscardMaterial>
      </Box>

      <Box
        name='btn_bgv_large_banner'
        args={[16, 8, 1]}
        rotation={[Math.PI * 0.1, 0, 0]}
        position={[0.1699531754116111, 11.302642526716143 - 1, -0.01978091483588462]}
        onClick={(ev) => {
          let world = new Vector3()

          ev.object.getWorldPosition(world)

          anime({
            targets: [controls.target],
            x: world.x,
            y: world.y,
            z: world.z,
            duration: 700,
            easing: 'easeInOutQuad',
            update: () => {
              controls.update()
            },
          })

          anime({
            targets: [controls.object.position],
            x: world.x + 0,
            y: world.y + 3,
            z: world.z + 30,
            duration: 700,
            easing: 'easeInOutQuad',
            update: () => {
              controls.update()
            },
            complete: () => {},
          })
        }}
      >
        <MeshDiscardMaterial></MeshDiscardMaterial>
      </Box>

      <Cylinder
        name='btn_stage'
        rotation={[Math.PI * 0, 0, 0]}
        args={[9, 9, 2]}
        position={[1.002783992175682 + 0.5, 0, 0.5 + 15.554384828411049]}
        onClick={(ev) => {
          // console.log(ev.object)
          let world = new Vector3()

          ev.object.getWorldPosition(world)

          anime({
            targets: [controls.target],
            x: world.x,
            y: world.y,
            z: world.z,
            duration: 700,
            easing: 'easeInOutQuad',
            update: () => {
              controls.update()
            },
          })

          anime({
            targets: [controls.object.position],
            x: world.x + 20,
            y: world.y + 10,
            z: world.z + 20,
            duration: 700,
            easing: 'easeInOutQuad',
            update: () => {
              controls.update()
            },
            complete: () => {},
          })
        }}
      >
        <MeshDiscardMaterial></MeshDiscardMaterial>
      </Cylinder>
    </>
  )
}

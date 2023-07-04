import { Image, MeshTransmissionMaterial, RoundedBox, Text } from '@react-three/drei'
import { useEnv } from '../useEnv/useEnv'
import { useFrame, useThree } from '@react-three/fiber'
import { Color } from 'three'
import { useRef } from 'react'

export function Card() {
  const showWW = 53.98 / 30
  const showHH = 85.6 / 30
  const showAspect = showWW / showHH

  //
  // let envMap = useEnv({}, 256, -1)
  let scene = useThree((r) => r.scene)
  scene.background = new Color('#000000')
  // scene.environment = envMap

  let ref = useRef()
  useFrame((st) => {
    let t = st.clock.getElapsedTime()

    if (ref.current) {
      ref.current.rotation.x = 0.1 * Math.cos(t * 0.5)
      ref.current.rotation.y = 0.1 * Math.cos(t * 0.5)
      ref.current.position.y = showHH + 0.3 + 0.1 * Math.sin(t * 0.5)
    }
  })
  //
  return (
    <>
      <RoundedBox ref={ref} position={[0, showHH, 0]} scale={2} args={[showWW, showHH, 0.1]}>
        <MeshTransmissionMaterial
          transmission={2}
          roughness={0.2}
          reflectivity={0.2}
          thickness={2}
          envMapIntensity={1}
          metalness={0.5}
          chromaticAberration={0.0}
          transmissionSampler={false}
        ></MeshTransmissionMaterial>
        {/* <meshPhysicalMaterial
        color={'#ffffff'}
        metalness={1}
        roughness={0}
        envMap={envMap}
        envMapIntensity={1}
      ></meshPhysicalMaterial> */}

        <group position={[0, -0.2, 0.1]}>
          <Text
            font={`/lok/Montserrat-Medium.ttf`}
            position={[0, 0.65, 0.0]}
            color={'white'}
            outlineWidth={0.05}
            scale={0.25}
          >
            Bear Ng
          </Text>
          <Text
            font={`/lok/Montserrat-Medium.ttf`}
            position={[0, 0.45, 0.0]}
            color={'white'}
            outlineWidth={0.05}
            scale={0.125}
          >
            Marketing Director
          </Text>
          <Text
            font={`/lok/Montserrat-Medium.ttf`}
            position={[0, 0.2, 0.0]}
            color={'white'}
            outlineWidth={0.05}
            scale={0.1}
          >
            Reunite Limited
          </Text>

          <Text
            font={`/lok/Lato-Regular.ttf`}
            position={[0, -0.23, 0.0]}
            color={'white'}
            outlineWidth={0.05}
            scale={0.1}
          >
            bear@agape.games
          </Text>

          <Text
            font={`/lok/Lato-Regular.ttf`}
            position={[0, -0.4, 0.0]}
            color={'white'}
            outlineWidth={0.05}
            scale={0.1}
          >
            +852 9303 1049
          </Text>

          <Text
            onClick={() => {
              window.open('https://t.me/artbvrh', '_blank')
            }}
            font={`/lok/Lato-Regular.ttf`}
            position={[0, -0.55, 0.0]}
            color={'white'}
            outlineWidth={0.05}
            scale={0.1}
          >
            t.me/artbvrh
          </Text>
        </group>
      </RoundedBox>
    </>
  )
}

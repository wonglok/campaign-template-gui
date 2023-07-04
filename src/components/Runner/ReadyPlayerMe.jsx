import { useFBX, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { AnimationMixer } from 'three'
import { useFinger } from '../HandGame/NoodleCamera/useFinger'

export function ReadyPlayerMe() {
  let actions = {
    idle: useFBX(`/agape-sdk/rpm/rpm-actions-emoji/talk-phone.fbx`),
    push: useFBX(`/agape-sdk/rpm/rpm-actions-emoji/torch-showing-figure-my-avatar.fbx`),
    attract: useFBX(`/agape-sdk/rpm/rpm-actions-emoji/torch-crouch-showing.fbx`),
  }

  let glb = useGLTF(`/agape-sdk/rpm/avatar/default-lok.glb`)

  let anim = useMemo(() => {
    return new AnimationMixer(glb.scene)
  }, [glb.scene])

  useFrame((st, dt) => {
    anim.update(dt)
  })

  let avatarAction = useFinger((r) => r.avatarAction)
  let lastAction = useRef(avatarAction)

  useEffect(() => {
    // avatarAction
    if (actions[avatarAction]?.animations) {
      anim.clipAction(actions[avatarAction].animations[0]).reset().play()
      lastAction.current = avatarAction
    }
    return () => {
      anim.clipAction(actions[lastAction.current].animations[0]).reset().fadeOut(0.25)
    }
  }, [actions, anim, avatarAction])

  return (
    <group>
      {/*  */}

      <primitive object={glb.scene}></primitive>

      {/*  */}
    </group>
  )
}

//
//
//

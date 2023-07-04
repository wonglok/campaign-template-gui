import { create } from 'zustand'

export const useFinger = create((set) => {
  return {
    videoTexture: false,
    menuText: 'Start Game',
    noMenu: false,

    avatarAction: 'idle',
  }
})

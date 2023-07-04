import { create } from 'zustand'
import { Data } from './Data.js'
import { initStoreForPostProc } from 'agape-sdk/src/main'

export const useStore = create(() => {
  let r = {
    result: Data,
  }

  return {
    from: `_${Math.random()}`,
    // cdn
    baseURL: `https://cdn.agape.town`,
    gameMode: `street`,
    insepction: 'normal',
    // envURL: `/envMap/ma-galaxy.webp`,
    //!SECTION
    //
    scene: [], // tree
    postProcessingConfig: initStoreForPostProc({
      postProcessingConfig: r.result?.projectMeta?.postProcessingConfig || {},
    }),
    envURL: r.result?.projectMeta?.envURL,
    myAvatarURL: r.result?.projectMeta?.myAvatarURL,
    colliderGLBURL: r.result?.projectMeta?.colliderGLBURL,
    gameMode: r.result?.projectMeta?.gameMode,
    postprocessing: r.result?.projectMeta?.postprocessing,
    insepction: r.result?.projectMeta?.insepction,
    sceneList: r.result?.sceneList,
    nodesList: r.result?.nodesList,
    edgesList: r.result?.edgesList,
    graphFocus: 'root',
    //
    ready: true,
  }
})

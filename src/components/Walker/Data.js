export const Data = {
  sceneList: [],
  projectMeta: {
    postprocessing: 'game',
    tab: 'nodeSystem',
    insepction: 'normal',
    myAvatarURL: '/assets/2023-04-07-walk/lok-groom.glb',
    // colliderGLBURL: '/lok/BGVexpo002-1024-v1--1979965060.glb',
    colliderGLBURL: '/world/glb-world.glb',
    from: '_5c53fde3dc58d7d7fcc64d00d8c9b692',
    postProcessingConfig: {
      bloomPass: {
        intensity: 2,
        useThisOne: false,
        mipmapBlur: true,
        resolutionScale: 0.25,
        luminanceThreshold: 0.4,
      },
      wavePass: {
        waveSize: 0.2,
        maxRadius: 0.3,
        amplitude: 0.3,
        useThisOne: false,
        speed: 0.75,
      },
      colorPass: {
        saturation: 0.1,
        hue: 0,
        brightness: -0.05,
        useThisOne: false,
        contrast: 0.2,
      },
      ssrPass: {
        useThisOne: false,
        distance: 10,
        thickness: 10,
        refineSteps: 8,
        blend: 0.9,
        blur: 0,
        ior: 1.45,
        jitterRoughness: 0.025,
        fade: 0,
        correctionRadius: 1,
        useNormalMap: true,
        useRoughnessMap: true,
        exponent: 1,
        maxRoughness: 1,
        roughnessFade: 1,
        maxDepthDifference: 10,
        blurKernel: 1,
        steps: 8,
        missedRays: true,
        intensity: 0.2,
        jitter: 0.025,
        resolutionScale: 1,
        velocityResolutionScale: 0.125,
        blurSharpness: 10,
        correction: 1,
      },
      aoPass: {
        intensity: 5,
        aoRadius: 5,
        useThisOne: false,
        color: '#000000',
        distanceFalloff: 1,
      },
      chromePass: {
        offsetX: 0.005,
        offsetY: 0.005,
        useThisOne: false,
        radialModulation: true,
        modulationOffset: 0.5,
      },
      envMapIntensity: 1,
      emissiveIntensity: 1,
      multisampling: 0,
    },
    envURL: '/agape-sdk/hdr/concret.hdr',
    gameMode: 'street', //room, orbit,street
  },
  nodesList: [],
  edgesList: [],
}
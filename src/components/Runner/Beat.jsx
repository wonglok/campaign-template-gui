import { useEffect } from 'react'
import { Data } from '../Loader/local/data'
import { useMic } from '../mic/mic'
// import { useThree } from '@react-three/fiber'
// import { Color } from 'three'

export function Beat({ useStore }) {
  useEffect(() => {
    let tt = setInterval(() => {
      let node = Data.sceneList.find((r) => r.oid === '_4ff8bd677bf44cd0d39399f3da7be382')

      let mic = useMic.getState()

      if (!node) {
        return
      }
      // node.surfaceEmissionForce = 0.1 + (((mic.mid + mic.high) / 2) * 2.0 + mic.avg * 0.5) * 8.0
      // node.playerAttractionForce = 0

      // node.unitScale = 0.05
      //
      // useStore.setState({
      //   sceneList: Data.sceneList.map((r) => {
      //     if (r.oid === node.oid) {
      //       return node
      //     }
      //   }),
      // })
    })

    //
    return () => {
      clearInterval(tt)
    }
  }, [useStore])

  return null
}

import { useEffect, useMemo, useRef, useState } from 'react'
import DepthKit, { VideoEl } from './concert_v7/depthkit'
import { useProfiles } from '../html/Profiles/useProfiles'
// import { useConcert } from './concert_v7/useConcert'

export function HologramV7WrapperProfile({ profile }) {
  let [st, setSt] = useState(false)
  useEffect(() => {
    let yo = async () => {
      try {
        let holoGUIConfig = await fetch(`${profile.holoGUIUrl.baseURL}${profile.holoGUIUrl.downloadURL}`, {
          method: 'GET',
          mode: 'cors',
        }).then((r) => {
          return r.json()
        })

        let holoVideoUrl = `${profile.holoVideoUrl.baseURL}${profile.holoVideoUrl.downloadURL}`

        let holoPosterUrl = `${profile.holoPosterUrl.baseURL}${profile.holoPosterUrl.downloadURL}`

        let holoJsonUrl = `${profile.holoJsonUrl.baseURL}${profile.holoJsonUrl.downloadURL}`

        setSt({
          holoGUIConfig,
          holoVideoUrl,
          holoPosterUrl,
          holoJsonUrl,
        })
      } catch (e) {
        console.log(e)
      }
    }
    yo()
  }, [profile])

  return (
    <group>
      {st && (
        <HologramV7Content
          holoVideoUrl={st.holoVideoUrl}
          holoPosterUrl={st.holoPosterUrl}
          holoJsonUrl={st.holoJsonUrl}
          holoGUIConfig={st.holoGUIConfig}
        ></HologramV7Content>
      )}
    </group>
  )
}

export function LoopThroughHolograms() {
  let cursor = useRef(1)

  let publicProfiles = useProfiles((r) => r.publicProfiles)

  useEffect(() => {
    let inter = () => {
      useProfiles
        .getState()
        .loadPublicProfiles()
        .then((r) => {
          console.log(r)
          cursor.current = (cursor.current + 1) % r.length

          useProfiles.setState({ publicProfiles: r })
        })
    }
    inter()
    let tt = setInterval(inter, 10 * 1000)

    return () => {
      clearInterval(tt)
    }
  }, [])

  // useEffect(() => {
  //   //
  //   let doWork = () => {}

  //   let tt = setInterval(doWork, 1000 * 20)

  //   return () => {
  //     clearInterval(tt)
  //   }
  // }, [publicProfiles])
  return (
    <>
      <group rotation={[0, Math.PI * 0.75, 0]} position={[0.25, 0.5, 0]} scale={1.5}>
        {publicProfiles[cursor.current] && (
          <HologramV7WrapperProfile
            key={publicProfiles[cursor.current]?._id}
            profile={publicProfiles[cursor.current]}
          ></HologramV7WrapperProfile>
        )}
      </group>
      {/*  */}

      {/*  */}
    </>
  )
}

export function HologramV7Content({ holoVideoUrl, holoPosterUrl, holoJsonUrl, holoGUIConfig }) {
  let { kit } = useMemo(() => {
    // if (typeof window === 'undefined') {
    //   return { kit: null }
    // }

    DepthKit.buildGeomtery()

    let video = new VideoEl({
      _movie: holoVideoUrl, //'/assets/2023-05-16-b/box/TAKE_02_25_16_49_08.mp4',
      _poster: holoPosterUrl, //'/assets/2023-05-16-b/box/TAKE_02_25_16_49_08.png',
    })

    let kit = new DepthKit(`points`, video, holoJsonUrl)

    document.body.addEventListener('click', () => {
      kit.depthkit.play()
    })

    kit.setLoop(true)

    let yo = setInterval(() => {
      if (kit) {
        kit.update()

        kit.allMaterials.forEach((m) => {
          m.uniforms.merger.value = 0
        })

        if (kit.props) {
          //

          kit.props.perspectives.forEach((prop, idx) => {
            if (kit[`sync${idx}`]) {
              kit.traverse((it) => {
                let json = holoGUIConfig

                for (let i = 0; i < 10; i++) {
                  if (it.name === 'mesh' + i) {
                    let fd = json.feed[i]

                    if (!fd) {
                      return
                    }

                    it.myParent.position.fromArray(fd.position)
                    it.myParent.rotation.fromArray(fd.rotation)
                  }
                }
              })

              holoGUIConfig.feed.forEach((it) => {
                kit.dict.set(it.idx, { slots: kit.lookup[it.chosenIDX] })
              })
              kit[`sync${idx}`]()
            }
          })
        }
      }

      // load(useConcert.getState())
    })

    kit.frustumCulled = false

    return {
      kit,
      yo,
    }
  }, [holoVideoUrl, holoPosterUrl, holoJsonUrl, holoGUIConfig])

  useEffect(() => {
    return () => {
      kit.dispose()
    }
  }, [kit])
  return (
    <>
      <group position={[0, 0, 0]}>{kit && <primitive object={kit}></primitive>}</group>
    </>
  )
}

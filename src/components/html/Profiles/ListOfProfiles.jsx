import { useEffect } from 'react'
import { useProfiles } from './useProfiles'
import { useRouter } from 'next/router'
import { S3Store } from './S3Store'

export function ListOfProfiles() {
  let profiles = useProfiles((r) => r.profiles)
  let router = useRouter()

  //
  useEffect(() => {
    useProfiles.getState().loadProfiles()
  }, [])

  //
  return (
    <>
      {profiles.map((r) => {
        return (
          <div key={r._id}>
            <button className='mb-3 mr-3 cursor-default rounded-lg border p-3'>{r.displayName}</button>
            <button
              className='mb-3 mr-3 rounded-lg bg-blue-200 p-3'
              onClick={() => {
                router.push(`/admin/profile/${r._id}`)
              }}
            >
              Edit
            </button>
            {/*  */}
            <button
              className='mb-3 mr-3 rounded-lg bg-red-300 p-3'
              onClick={() => {
                if (!window.confirm('Delete?')) {
                  return
                }

                // console.log(r)

                S3Store.deleteFile({
                  file: r.holoGUIUrl,
                })
                S3Store.deleteFile({
                  file: r.holoJsonUrl,
                })
                S3Store.deleteFile({
                  file: r.holoPosterUrl,
                })
                S3Store.deleteFile({
                  file: r.holoVideoUrl,
                })

                useProfiles.getState().removeProfile(r._id)
              }}
            >
              Remove
            </button>

            {/*  */}
          </div>
        )
      })}
      {/*  */}

      {/*  */}

      {/*  */}
    </>
  )
}

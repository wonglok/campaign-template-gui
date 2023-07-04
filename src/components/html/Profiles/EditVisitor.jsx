import { Suspense, useEffect, useRef, useState } from 'react'
import { useProfiles } from './useProfiles'
import { S3Store } from './S3Store'
import { Canvas } from '@react-three/fiber'
import { HologramV7WrapperProfile } from '@/components/Hologram/HologramV7'
import { Box, OrbitControls } from '@react-three/drei'

export function EditVisitor({ profile }) {
  let displayName = useRef()
  let username = useRef()
  let website = useRef()

  let [_, reload] = useState(0)

  useEffect(() => {
    displayName.current.value = profile.displayName
    username.current.value = profile.username
    website.current.value = profile.website
  }, [profile])

  //
  return (
    <div>
      <div className='w-full max-w-xl'>
        <div className='mb-6 md:flex md:items-center'>
          <div className='md:w-1/3'>
            <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right' htmlFor='inline-full-name'>
              Business Name
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
              type='text'
              ref={displayName}
              placeholder='Meta Chicken'
            />
          </div>
        </div>

        <div className='mb-6 md:flex md:items-center'>
          <div className='md:w-1/3'>
            <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right' htmlFor='inline-full-name'>
              Username
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
              type='text'
              ref={username}
              placeholder='Username'
            />
          </div>
        </div>

        <div className='mb-6 md:flex md:items-center'>
          <div className='md:w-1/3'>
            <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right' htmlFor='inline-full-name'>
              Website
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
              type='text'
              ref={website}
              placeholder='mybusiness.com'
            />
          </div>
        </div>

        <div className='mb-6 md:flex md:items-start'>
          <div className='md:w-1/3'>
            <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right' htmlFor='inline-full-name'>
              Hologram Upload
            </label>
          </div>
          <div className='md:w-2/3'>
            <UploadFile
              text='Camera Metadata'
              username={profile.username}
              data={profile.holoJsonUrl}
              onDone={async ({ url, result }) => {
                if (result) {
                  result.url = url
                }
                profile.holoJsonUrl = result

                let data = await useProfiles.getState().updateProfile({
                  profile: profile,
                })

                console.log(data)

                reload((x) => x + 1)
                // console.log(url, result)
                //
              }}
            ></UploadFile>

            <UploadFile
              text='Hologram Poster'
              username={profile.username}
              data={profile.holoPosterUrl}
              onDone={async ({ url, result }) => {
                if (result) {
                  result.url = url
                }
                profile.holoPosterUrl = result

                let data = await useProfiles.getState().updateProfile({
                  profile: profile,
                })

                console.log(data)
                reload((x) => x + 1)

                // console.log(url, result)
                //
              }}
            ></UploadFile>

            <UploadFile
              text='Video Source'
              username={profile.username}
              data={profile.holoVideoUrl}
              onDone={async ({ url, result }) => {
                if (result) {
                  result.url = url
                }

                profile.holoVideoUrl = result

                let data = await useProfiles.getState().updateProfile({
                  profile: profile,
                })

                reload((x) => x + 1)
                console.log(data)
                // console.log(url, result)
                //
              }}
            ></UploadFile>

            <UploadFile
              text='GUI Settings'
              username={profile.username}
              data={profile.holoGUIUrl}
              onDone={async ({ url, result }) => {
                if (result) {
                  result.url = url
                }
                profile.holoGUIUrl = result

                let data = await useProfiles.getState().updateProfile({
                  profile: profile,
                })

                console.log(data)
                reload((x) => x + 1)
                // console.log(url, result)
                //
              }}
            ></UploadFile>

            <div>
              <a
                download={'gui.json'}
                href={`/assets/2023-05-16-b/andrew/gui.json`}
                className='underline'
                target='_blank'
              >
                Get Default GUI Settings
              </a>
            </div>
          </div>
        </div>

        <div className='mb-4 md:flex md:items-center'>
          <div className='md:w-1/3'></div>
          <div className='md:w-2/3'>
            <button
              onClick={async () => {
                profile.displayName = displayName.current.value
                profile.username = username.current.value
                profile.website = website.current.value

                let data = await useProfiles.getState().updateProfile({
                  profile: profile,
                })
                console.log(data)
              }}
              className='focus:shadow-outline rounded bg-purple-500 px-4 py-2 font-bold text-white shadow hover:bg-purple-400 focus:outline-none'
            >
              Update
            </button>
          </div>
        </div>

        <div className='mb-4 md:flex md:items-start'>
          <div className='flex justify-end md:w-1/3'>Preview Box</div>
          <div className='md:w-2/3'>
            {(profile.holoJsonUrl && profile.holoPosterUrl && profile.holoVideoUrl && profile.holoGUIUrl && (
              <Canvas className='border'>
                <OrbitControls position={[0, 5, 10]} target={[0, 1, 0]}></OrbitControls>
                <HologramV7WrapperProfile profile={profile}></HologramV7WrapperProfile>
              </Canvas>
            )) || (
              <>
                <div className='border p-3'>Please Upload all the required files</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function UploadFile({
  username = '',
  data = false,
  onDone = (v) => {
    console.log(v)
  },
  text = '',
}) {
  let [result, setState] = useState(data)

  return (
    <>
      <div
        className={
          (result ? `border-green-200 bg-green-200 ` : `border-blue-200 bg-blue-200 `) +
          ` mb-2 flex w-full appearance-none rounded-full border-2 px-4 py-2 text-left leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none`
        }
      >
        <button
          onClick={async (ev) => {
            //
            let fileInput = document.createElement('input')
            fileInput.type = 'file'
            fileInput.multiple = false

            fileInput.onchange = () => {
              let acceptedFiles = fileInput.files || []
              upload(acceptedFiles)
            }
            fileInput.click()

            //
            //
            let upload = async (acceptedFiles = []) => {
              // let totalFilesToUpload = acceptedFiles.length

              for (let myFile of acceptedFiles) {
                try {
                  let res = await S3Store.signFile({
                    username: username,
                    file: myFile,
                  })

                  console.log(res.result)

                  let formdata = new FormData()

                  for (let kn in res.result.fields) {
                    formdata.append(kn, res.result.fields[kn])
                  }
                  formdata.append('file', myFile)

                  await fetch(`${res.result.url}`, {
                    mode: 'cors',
                    method: 'POST',
                    body: formdata,
                  })
                    //
                    .then((r) => {
                      return r.text()
                    })
                    .then((r) => {
                      console.log('successfully uploaded', r)
                    })

                  onDone({
                    result: res.result,
                  })
                  setState(res.result)
                } catch (e) {
                  console.log(e)
                }
              }
            }
          }}
          className='mr-2 rounded-full bg-white p-3 px-5 '
        >
          {`${text}`} {result ? '✅' : ''}
        </button>

        {result && (
          <button
            onClick={async (ev) => {
              //
              S3Store.deleteFile({
                file: result,
              })

              onDone({
                url: false,
                result: false,
              })
              setState(false)

              //
            }}
            className='mr-2 rounded-full bg-red-400 p-3 px-5 text-white'
          >
            Remove
          </button>
        )}
      </div>
    </>
  )
}

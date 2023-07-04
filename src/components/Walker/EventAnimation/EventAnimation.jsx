import { LoaderGLB } from 'agape-sdk/src/main'
import { useRef } from 'react'

export function EventAnimation({ url = `` }) {
  let gp = useRef()
  return (
    <>
      <group ref={gp}>
        <LoaderGLB url={`${url}`}></LoaderGLB>
      </group>
      {/*  */}

      {/*  */}
    </>
  )
}

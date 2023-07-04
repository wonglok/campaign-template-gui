import { useEffect } from 'react'

export function Avaturn() {
  useEffect(() => {
    openIframe()
  }, [])

  return (
    <>
      <iframe className='h-full w-full' id='avaturn'></iframe>
    </>
  )
}

function openIframe() {
  // Replace it with your own subdomain
  let frame = document.querySelector('#avaturn')
  let subdomain = 'agape'
  if (frame.src == '') {
    frame.src = `https://${subdomain}.avaturn.dev`
  }
  frame.hidden = false
}

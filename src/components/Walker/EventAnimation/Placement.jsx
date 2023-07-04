import { createPortal, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'

export function Placement({ children, name, ...props }) {
  let [found, setFound] = useState(false)

  let scene = useThree((r) => r.scene)
  useEffect(() => {
    let tt = setInterval(() => {
      let fd = scene.getObjectByName(name)

      if (fd) {
        clearInterval(tt)
        setFound(fd)
      }
    })

    return () => {
      clearInterval(tt)
    }
    //setFound
  }, [scene, name])
  return (
    <>
      <group>
        {found && createPortal(<group {...props}>{children}</group>, found)}
        {found && (
          <group>
            <primitive object={found}></primitive>
          </group>
        )}
      </group>
      {/*  */}
    </>
  )
}

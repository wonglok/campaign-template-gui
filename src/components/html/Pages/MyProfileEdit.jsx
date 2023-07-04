import { useRouter } from 'next/router'
import { AdminGate } from '../AdminLayout/AdminGate'
import { EditVisitor } from '../Profiles/EditVisitor'
import { useEffect, useState } from 'react'
import { useProfiles } from '../Profiles/useProfiles'

export function MyProfileEdit() {
  // let sess = useSession()
  // sess?.data?.user?.name

  let router = useRouter()
  let query = router.query || {}
  let profileID = query.profileID

  let [st, setSt] = useState(false)

  useEffect(() => {
    if (!profileID) {
      return
    }
    //
    useProfiles
      .getState()
      .loadOneProfile({ _id: profileID })
      .then((r) => {
        setSt(r)
      })
  }, [profileID])
  return (
    <>
      {/*  */}
      <AdminGate>
        <h1 className='daysfont mb-3 text-2xl'>Visitor Profile</h1>

        {st && <EditVisitor profile={st}></EditVisitor>}
        {/* <Login></Login> */}
      </AdminGate>
      {/*  */}
    </>
  )
}

//
// function openIframe() {
//   // Replace it with your own subdomain
//   let subdomain = 'demo'
//   if (frame.src == '') {
//     frame.src = `https://${subdomain}.avaturn.dev`
//   }
//   frame.hidden = false
// }

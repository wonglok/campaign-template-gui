import { AdminGate } from '../AdminLayout/AdminGate'
import { CreateVisitor } from '../Profiles/CreateVisitor'

export function MyProfileCreate() {
  // let sess = useSession()
  // sess?.data?.user?.name
  return (
    <>
      {/*  */}
      <AdminGate>
        <h1 className='daysfont mb-3 text-2xl'>Create New Visitor Profile</h1>
        <CreateVisitor></CreateVisitor>
        {/* <ListOfProfiles></ListOfProfiles> */}
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

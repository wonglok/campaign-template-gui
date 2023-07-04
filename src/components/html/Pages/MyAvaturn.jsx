import { AdminGate } from '../AdminLayout/AdminGate'
import { Avaturn } from '../Content/Avaturn/Avaturn'

export function MyAvaturn() {
  // let sess = useSession()
  // sess?.data?.user?.name
  return (
    <>
      {/*  */}
      <AdminGate>
        <Avaturn></Avaturn>
        {/* <Login></Login> */}
      </AdminGate>
      {/*  */}
    </>
  )
}

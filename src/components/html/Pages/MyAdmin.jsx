import Link from 'next/link'
import { AdminGate } from '../AdminLayout/AdminGate'

export function MyAdmin() {
  // sess?.data?.user?.name
  return (
    <>
      {/*  */}
      <AdminGate>
        {/*  */}
        <h2 className='daysfont text-2xl underline'>Welcome to AGAPE Backend</h2>
        <Link href={`/admin/profile-create`}>
          <button className='my-3 mr-3 bg-gray-200 p-3'>Create and Upload Hologram</button>
        </Link>
        <Link href={`/admin/profile`}>
          <button className='my-3 mr-3 bg-gray-200 p-3'>View All Holograms</button>
        </Link>
        {/* <Login></Login> */}
      </AdminGate>
      {/*  */}
    </>
  )
}

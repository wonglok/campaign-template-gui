import { signOut } from 'next-auth/react'
import { Menu } from '../Menu/Menu'
import { MenuItems } from '../Menu/MenuItems'
import { useRouter } from 'next/router'

export function AdminLayout({ children }) {
  let router = useRouter()
  let route = router.asPath

  return (
    <div className='h-full w-full bg-gradient-to-t from-green-200  to-cyan-900 p-5'>
      <div
        style={{ maxWidth: '1680px' }}
        className='rounded-box glass mx-auto h-full w-full bg-opacity-60 text-base-content shadow-lg backdrop-blur-lg'
      >
        <>
          <div className='px-2 pt-2' style={{ height: '4.5rem' }}>
            <div className='navbar rounded-box space-x-1 text-primary-content'>
              <div className='ml-3 flex-1 text-2xl'>
                {/* <div className='' style={{ width: `18rem` }}></div> */}
                <div className='mr-5 flex items-center rounded-2xl bg-gray-100 px-5 text-black'>
                  <div className='breadcrumbs flex text-base shadow-xl'>
                    <ul>
                      <li className=''>
                        <a href='/' target={'_blank'} referrerPolicy='no-referrer'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            className='mr-2 h-4 w-4 stroke-current'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                            ></path>
                          </svg>
                          Landing Page
                        </a>
                      </li>
                      <li>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          className='mr-2 h-4 w-4 stroke-current'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                          ></path>
                        </svg>
                        Admin Portal
                      </li>
                      <li>
                        {/* <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          className='w-4 h-4 mr-2 stroke-current'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'></path>
                        </svg> */}
                        {MenuItems.find((r) => r.link === route)?.content}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* <div className='hidden flex-1 md:flex md:flex-none'>
                <div className='form-control'>
                  <div className='dropdown'>
                    <div tabIndex='0'>
                      <input
                        placeholder='Search'
                        className='input-bordered input-ghost input rounded-full text-primary-content placeholder:text-primary-content focus:bg-transparent focus:text-primary-content'
                      />
                    </div>
                    <div tabIndex='0' className='dropdown-content py-2'>
                      <div className='compact card rounded-box w-72 bg-neutral-focus text-neutral-content shadow-xl'>
                        <div className='card-body'>
                          <h2 className='card-title font-extrabold capitalize'>Search Result</h2>
                          <p className='text-sm text-neutral-content text-opacity-80'>...</p>
                          <div className='mt-4 flex justify-end'>
                            <a className='btn-primary btn-sm btn xl:btn-md'>View More</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <button
                aria-label='button component'
                className='mask btn-ghost mask-squircle btn-square btn hidden border-none focus:bg-base-content focus:bg-opacity-50 md:flex'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='inline-block h-6 w-6 stroke-current'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  ></path>
                </svg>
              </button> */}
              {/* <div className='dropdown-left dropdown '>
                <div tabIndex='0'>
                  <button
                    aria-label='button component'
                    className='mask btn-ghost mask-squircle btn-square btn hidden border-none focus:bg-base-content focus:bg-opacity-50 md:flex'
                  >
                    <svg
                      width='24'
                      height='24'
                      xmlns='http://www.w3.org/2000/svg'
                      fillRule='evenodd'
                      clipRule='evenodd'
                      className='inline-block h-6 w-6 fill-current stroke-current'
                    >
                      <path d='M22 24h-17c-1.657 0-3-1.343-3-3v-18c0-1.657 1.343-3 3-3h17v24zm-2-4h-14.505c-1.375 0-1.375 2 0 2h14.505v-2zm0-18h-3v9l-2-1.547-2 1.547v-9h-8v16h15v-16z' />
                    </svg>
                  </button>
                </div>
                <div tabIndex='0' className='dropdown-content translate-x-12 translate-y-12 py-2'>
                  <div className='compact card rounded-box w-72 bg-gray-300 text-black shadow'>
                    <div className='card-body'>
                      <h2 className='card-title font-extrabold capitalize'>Bible</h2>
                      <p className='text-sm text-black text-opacity-80'>{`Look to the LORD and his strength; seek his face always. — Psalm 105:4`}</p>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className='dropdown-left dropdown'>
                <div tabIndex='0'>
                  <button
                    aria-label='navbar component'
                    className='mask btn-ghost mask-squircle btn-square btn hidden border-none focus:bg-base-content focus:bg-opacity-50 md:flex'
                  >
                    <div className='avatar shadow-lg'>
                      <svg
                        width='24'
                        height='24'
                        xmlns='http://www.w3.org/2000/svg'
                        fillRule='evenodd'
                        clipRule='evenodd'
                        className='inline-block h-6 w-6 stroke-current'
                      >
                        <path
                          fill='white'
                          d='M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z'
                        />
                      </svg>
                      {/* <div className='mask mask-squircle h-10 w-10'>
                        <img src='/img/user-image/faces/dog128.png' alt='Avatar Tailwind CSS Component' />
                      </div> */}
                    </div>
                  </button>
                </div>
                <div tabIndex='0' className='dropdown-content translate-x-12 translate-y-12 py-2'>
                  <div className='compact card rounded-box w-72 bg-neutral-focus text-neutral-content shadow-xl'>
                    <div className='card-body'>
                      <h2 className='daysfont card-title font-extrabold capitalize'> See you around... 🥺 👋🏻</h2>
                      <button
                        className='btn-primary btn p-2'
                        onClick={() => {
                          //
                          console.log('logout')
                          signOut()
                        }}
                      >
                        Logout
                        <svg
                          className='ml-3 h-6 w-6'
                          width='24'
                          height='24'
                          xmlns='http://www.w3.org/2000/svg'
                          fillRule='evenodd'
                          clipRule='evenodd'
                        >
                          <path
                            fill='white'
                            d='M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='h-full' style={{ height: 'calc(100% - 4.5rem)' }}>
            <div className='h-full px-6 pb-8 pt-2'>
              <div className='flex h-full'>
                <div className='' style={{ width: `17rem` }}>
                  <Menu></Menu>
                </div>
                <div className='ml-5 h-full' style={{ width: `calc(100% - 17rem)` }}>
                  <div className='h-full overflow-auto rounded-2xl bg-white p-4 shadow-xl'>{children}</div>
                </div>
              </div>
            </div>
          </div>

          {/* <LogoutButton /> */}
        </>
      </div>
    </div>
  )
}

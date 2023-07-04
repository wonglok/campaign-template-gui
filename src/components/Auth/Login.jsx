import { signIn, signOut, useSession } from 'next-auth/react'

export function Login() {
  const sess = useSession()

  if (sess.status === 'authenticated') {
    return (
      <>
        Signed in as {JSON.stringify(sess?.data?.user?.name)} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

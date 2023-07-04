// import { getID } from 'agape-sdk/src/utils/getID'
import { ClientProfile, getID } from 'database/mongoose'
import { getServerSession } from 'next-auth/next'
export default async function API(req, res) {
  const session = await getServerSession(req, res)

  if (session) {
    // const kitty = new Cat({ name: 'Zildjian' })
    // kitty.save().then(() => console.log('meow'))

    res.send({
      session,
      content: 'This is protected content. You can access this content because you are signed in.',
    })
  } else {
    res.send({
      error: 'You must be signed in to view the protected content on this page.',
    })
  }
}

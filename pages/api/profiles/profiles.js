import { ClientProfile, getID } from 'database/mongoose'
import { getServerSession } from 'next-auth'

export default async function Profiles(req, res) {
  let session = await getServerSession(req, res)

  if (!session) {
    return res.status(406).json({
      msg: 'bad auth',
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      msg: 'method not allowed',
    })
  }

  let userID = session.user.name

  let bodyData = JSON.parse(req.body)

  let payload = bodyData.payload || {}

  if (bodyData.action === 'createProfile') {
    let item = await ClientProfile.create({
      displayName: payload.displayName || '',
      username: payload.username || '',
      website: payload.website || '',
      holoJsonUrl: '',
      holoPosterUrl: '',
      holoVideoUrl: '',
      holoGUIUrl: '',
      readyPlayerMeUrl: '',
    })

    return res.json({
      data: item,
    })
  }

  if (bodyData.action === 'loadProfiles') {
    let list = await ClientProfile.find({})

    return res.json({
      data: list,
    })
  }

  if (bodyData.action === 'loadOneProfile') {
    let data = await ClientProfile.findOne({ _id: payload._id })
    return res.json({
      data: data,
    })
  }

  if (bodyData.action === 'updateProfile') {
    await ClientProfile.findByIdAndUpdate(payload.profile._id, payload.profile)
    let data = await ClientProfile.findOne({ _id: payload.profile._id })

    return res.json({
      data: data,
    })
  }

  //

  if (bodyData.action === 'removeProfile') {
    let _id = payload._id

    await ClientProfile.deleteOne({ _id })

    return res.json({
      op: 'ok',
    })
  }
}

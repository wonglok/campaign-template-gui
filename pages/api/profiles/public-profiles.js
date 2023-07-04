import { ClientProfile, getID } from 'database/mongoose'

export default async function Profiles(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      msg: 'method not allowed',
    })
  }

  let bodyData = JSON.parse(req.body)

  let payload = bodyData.payload || {}

  if (bodyData.action === 'loadPublicProfiles') {
    let list = await ClientProfile.find({})

    return res.json({
      data: list,
    })
  }
}

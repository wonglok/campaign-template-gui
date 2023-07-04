// import clientPromise from './mongo'
import mongoose from 'mongoose'
// import clientPromise from './mongo'

const uri = process.env.MONGODB_URI

mongoose.connect(uri)

delete mongoose.models.ClientProfile
if (!mongoose.models.ClientProfile) {
  mongoose.model('ClientProfile', {
    //
    displayName: String,
    username: {
      type: String,
      unique: true,
    },
    website: String,

    holoJsonUrl: {},
    holoPosterUrl: {},
    holoVideoUrl: {},
    holoGUIUrl: {},

    readyPlayerMeUrl: String,
  })
}

export const ClientProfile = mongoose.models.ClientProfile

// const kitty = new Cat({ name: 'Zildjian' })
// kitty.save().then(() => console.log('meow'))

export const getID = () => {
  return '_' + Math.random().toString(36).slice(2, 9)
}

export const getMonID = () => {
  let id = new mongoose.Types.ObjectId()
  return id
}

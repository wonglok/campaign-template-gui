import slugify from 'slugify'
import path from 'path'
import md5 from 'md5'

export const S3Store = {}
S3Store.signFile = ({ username, file }) => {
  let fileSlug = slugify(path.basename(file.name).replace(path.extname(file.name), ''), '_')
  let md5v = md5(`${file.name}-${file.size}`)

  return fetch(`/api/profiles/file`, {
    method: 'post',
    mode: `same-origin`,
    body: JSON.stringify({
      action: 'signFile',
      payload: {
        username,
        fileName: `${fileSlug}_md5_${md5v}${path.extname(file.name)}`,
        md5v,
        contentType: file.type || 'application/octet-stream',
        size: file.size,
      },
    }),
  }).then(processResponse)
}

S3Store.deleteFile = ({ file }) => {
  return fetch(`/api/profiles/file`, {
    method: 'post',
    mode: `same-origin`,
    body: JSON.stringify({
      action: 'deleteFile',
      payload: {
        fields: file.fields,
      },
    }),
  }).then(processResponse)
}

const processResponse = async (r) => {
  let data = await r.json()

  if (r.ok) {
    return data
  } else {
    throw data
  }
}

import AWS, { S3 } from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
})

const s3 = new AWS.S3()

export async function uploadFileToAWS(
  buffer: S3.Body,
  name: string,
  type: { ext: string; mime: string },
) {
  console.log(process.env.REACT_APP_AWS_ACCESS_KEY_ID)
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.REACT_APP_S3_BUCKET!,
    ContentType: type.mime,
    Key: `${name}.${type.ext}` + `${Date.now()}`,
  }
  let response = await s3.upload(params).promise()
  console.log(JSON.stringify(response))

  return response
}

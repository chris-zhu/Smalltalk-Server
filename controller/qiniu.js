const qiniu = require('qiniu')
const { Ak, Sk, Bucket, BucketDomain } = require('../config/qiniu')

function uptoken() {
  const mac = new qiniu.auth.digest.Mac(Ak, Sk)
  const options = {
    scope: Bucket,
    expires: 3600 * 24
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  return putPolicy.uploadToken(mac)
}

/**
 * 获取bucket下面的所有文件
 * @param {string} bucket bucket 名称
 */
async function getBucketFileList(bucket) {
  const qiniu = require('qiniu')
  const mac = new qiniu.auth.digest.Mac(Ak, Sk)
  const client = new qiniu.rs.BucketManager(mac)
  return new Promise((resolve, reject) => {
    client.listPrefix(bucket, null, (err, res) => {
      if (!err) resolve(res.items)
      else reject(err)
    })
  })
}

/**
 * 将旧bucket所有文件移动到新bucket
 * @param {string} oldBucket 旧bucket
 * @param {string} newBucket 新bucket
 * @param {object} options 配置
 */
async function converBucket(oldBucket, newBucket, options = null) {
  const qiniu = require('qiniu')
  const mac = new qiniu.auth.digest.Mac(Ak, Sk)
  const client = new qiniu.rs.BucketManager(mac)
  const items = await getBucketFileList(oldBucket)
  if (!items.length) {
    items.forEach(it => {
      client.move(oldBucket, it.key, newBucket, it.key, options, (err, ret) => {
        if (!err) {
          console.log(ret)
        }
      })
    })
  }
}

module.exports = {
  uptoken,
  async getUpToken(ctx) {
    return (ctx.body = { token: uptoken(), domainUrl: BucketDomain })
  }
}

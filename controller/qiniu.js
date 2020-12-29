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

// const a = uptoken()
// console.log(a);

function a() {
  const qiniu = require('qiniu')
  // qiniu.conf.ACCESS_KEY = Ak
  // qiniu.conf.SECRET_KEY = Sk
  //构建bucketmanager对象
  const mac = new qiniu.auth.digest.Mac(Ak, Sk)
  var client = new qiniu.rs.BucketManager(mac)
  //你要测试的空间， 并且这个key在你空间中存在
  bucket = 'chris-server'
  key = '4k_1.jpg'
  //移动到的目标空间名和重命名的key
  dstbucket = 'smalltalk'
  dstkey = '4k_1.jpg'
  //移动资源
  client.move(bucket, key, dstbucket, dstkey, null, function (err, ret) {
    if (!err) {
      // ok
    } else {
      console.log(err)
    }
  })
}
a()

module.exports = {
  uptoken,
  async getUpToken(ctx) {
    return (ctx.body = { token: uptoken(), domainUrl: BucketDomain })
  }
}

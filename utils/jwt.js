const jwt = require('jsonwebtoken')
const secert = 'chris' // 密钥
const expiresIn = 1000 * 60 * 60 * 24 * 7 // 过期时间

module.exports = {
  key: secert,
  expiresIn,
  /**
   * 加密，返回token
   * @param {any} payload 加密载体 payload
   * @returns 返回一个token值
   */
  generateToken: (payload) => jwt.sign(payload, secert, { expiresIn }),
  /**
   * 解析token，返回解析后加密的值。解析失败，返回 null
   * @param {string} token token值
   * @returns 解析结果 { _id: string, iat: number, exp: number }
   */
  verifyToken: (token) => {
    let result = null
    try {
      jwt.verify(token, secert, (err, data) => {
        if (!err) result = data
      })
    } catch (err) {
      console.log(err)
    }
    return result
  }
}

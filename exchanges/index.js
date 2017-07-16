const yunbi = require('./yunbi')
const jubi = require('./jubi')
const bter = require('./bter')

module.exports = msg => {
  let content = msg.replace(/^.*?:\s*/, '')
  let promises = []
  promises.push(yunbi(content))
  promises.push(jubi(content))
  promises.push(bter(content))
  // 获取第一个成功的Promise
  return Promise.all(
    promises.filter(promise => promise)
    .map(
      promise => new Promise(
        resolve => setTimeout(
          () => resolve(promise), Math.random() * 1000
        )
      )
    )
    .map(
      promise => promise.then(
        res => Promise.reject(res),
        err => Promise.resolve(err)
      )
    )
  ).then(
    res => Promise.reject(res),
    err => Promise.resolve(err)
  )
}

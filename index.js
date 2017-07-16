'use strict'
const Wechat = require('wechat4u')
const qrcode = require('qrcode-terminal')
const fs = require('fs')
const exchanges = require('./exchanges')

let bot
/**
 * 尝试获取本地登录数据，免扫码
 * 这里演示从本地文件中获取数据
 */
try {
  bot = new Wechat(require('./sync-data.json'))
} catch (e) {
  bot = new Wechat()
}
/**
 * 启动机器人
 */
if (bot.PROP.uin) {
  // 存在登录数据时，可以随时调用restart进行重启
  bot.restart()
} else {
  bot.start()
}
/**
 * uuid事件，参数为uuid，根据uuid生成二维码
 */
bot.on('uuid', uuid => {
  qrcode.generate('https://login.weixin.qq.com/l/' + uuid, {
    small: true
  })
  console.log('二维码链接：', 'https://login.weixin.qq.com/qrcode/' + uuid)
})
/**
 * 登录成功事件
 */
bot.on('login', () => {
  console.log('登录成功')
  // 保存数据，将数据序列化之后保存到任意位置
  fs.writeFileSync('./sync-data.json', JSON.stringify(bot.botData))
})
/**
 * 登出成功事件
 */
bot.on('logout', () => {
  console.log('登出成功')
  // 清除数据
  fs.unlinkSync('./sync-data.json')
})
/**
 * 错误事件，参数一般为Error对象
 */
bot.on('error', err => {
  console.error('错误：', err)
})

bot.on('message', msg => {
  if (msg.MsgType === bot.CONF.MSGTYPE_TEXT) {
    exchanges(msg.Content)
    .then(res => {
      return bot.sendMsg(res, msg.FromUserName)
    }).catch(err => {
      bot.emit('error', err)
    })
  }
})

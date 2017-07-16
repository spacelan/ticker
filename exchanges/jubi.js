const axios = require('axios')
const coins = [
  { r: /([^a-zA-Z]|^)peb([^a-zA-Z]|$)|普银/i, zh: '普银', en: 'peb' },
  { r: /([^a-zA-Z]|^)dnc([^a-zA-Z]|$)|暗网币/i, zh: '暗网币', en: 'dnc' },
  { r: /([^a-zA-Z]|^)ans([^a-zA-Z]|$)|小蚁股/i, zh: '小蚁股', en: 'ans' },
  { r: /([^a-zA-Z]|^)mryc([^a-zA-Z]|$)|美人鱼币/i, zh: '美人鱼币', en: 'mryc' },
  { r: /([^a-zA-Z]|^)ifc([^a-zA-Z]|$)|无限币/i, zh: '无限币', en: 'ifc' },
  { r: /([^a-zA-Z]|^)gooc([^a-zA-Z]|$)|谷壳币/i, zh: '谷壳币', en: 'gooc' },
  { r: /([^a-zA-Z]|^)mtc([^a-zA-Z]|$)|猴宝币/i, zh: '猴宝币', en: 'mtc' },
  { r: /([^a-zA-Z]|^)bts([^a-zA-Z]|$)|比特股/i, zh: '比特股', en: 'bts' },
  { r: /([^a-zA-Z]|^)lkc([^a-zA-Z]|$)|幸运币/i, zh: '幸运币', en: 'lkc' },
  { r: /([^a-zA-Z]|^)qec([^a-zA-Z]|$)|企鹅链/i, zh: '企鹅链', en: 'qec' },
  { r: /([^a-zA-Z]|^)met([^a-zA-Z]|$)|美通币/i, zh: '美通币', en: 'met' },
  { r: /([^a-zA-Z]|^)plc([^a-zA-Z]|$)|保罗币/i, zh: '保罗币', en: 'plc' },
  { r: /([^a-zA-Z]|^)xas([^a-zA-Z]|$)|阿希币/i, zh: '阿希币', en: 'xas' },
  { r: /([^a-zA-Z]|^)eac([^a-zA-Z]|$)|地球币/i, zh: '地球币', en: 'eac' },
  { r: /([^a-zA-Z]|^)mcc([^a-zA-Z]|$)|行云币/i, zh: '行云币', en: 'mcc' },
  { r: /([^a-zA-Z]|^)rio([^a-zA-Z]|$)|里约币/i, zh: '里约币', en: 'rio' },
  { r: /([^a-zA-Z]|^)nxt([^a-zA-Z]|$)|未来币/i, zh: '未来币', en: 'nxt' },
  { r: /([^a-zA-Z]|^)wdc([^a-zA-Z]|$)|世界币/i, zh: '世界币', en: 'wdc' },
  { r: /([^a-zA-Z]|^)eth([^a-zA-Z]|$)|以太坊/i, zh: '以太坊', en: 'eth' },
  { r: /([^a-zA-Z]|^)etc([^a-zA-Z]|$)|以太经典/i, zh: '以太经典', en: 'etc' },
  { r: /([^a-zA-Z]|^)skt([^a-zA-Z]|$)|鲨之信/i, zh: '鲨之信', en: 'skt' },
  { r: /([^a-zA-Z]|^)doge([^a-zA-Z]|$)|狗狗币/i, zh: '狗狗币', en: 'doge' },
  { r: /([^a-zA-Z]|^)ytc([^a-zA-Z]|$)|一号币/i, zh: '一号币', en: 'ytc' },
  { r: /([^a-zA-Z]|^)zet([^a-zA-Z]|$)|泽塔币/i, zh: '泽塔币', en: 'zet' },
  { r: /([^a-zA-Z]|^)rss([^a-zA-Z]|$)|红贝壳/i, zh: '红贝壳', en: 'rss' },
  { r: /([^a-zA-Z]|^)hlb([^a-zA-Z]|$)|活力币/i, zh: '活力币', en: 'hlb' },
  { r: /([^a-zA-Z]|^)lsk([^a-zA-Z]|$)|LISK/i, zh: 'LISK', en: 'lsk' },
  { r: /([^a-zA-Z]|^)blk([^a-zA-Z]|$)|黑币/i, zh: '黑币', en: 'blk' },
  { r: /([^a-zA-Z]|^)ltc([^a-zA-Z]|$)|莱特币/i, zh: '莱特币', en: 'ltc' },
  { r: /([^a-zA-Z]|^)zcc([^a-zA-Z]|$)|招财币/i, zh: '招财币', en: 'zcc' },
  { r: /([^a-zA-Z]|^)jbc([^a-zA-Z]|$)|聚宝币/i, zh: '聚宝币', en: 'jbc' },
  { r: /([^a-zA-Z]|^)btc([^a-zA-Z]|$)|比特币/i, zh: '比特币', en: 'btc' },
  { r: /([^a-zA-Z]|^)vrc([^a-zA-Z]|$)|维理币/i, zh: '维理币', en: 'vrc' },
  { r: /([^a-zA-Z]|^)xrp([^a-zA-Z]|$)|瑞波币/i, zh: '瑞波币', en: 'xrp' },
  { r: /([^a-zA-Z]|^)tfc([^a-zA-Z]|$)|传送币/i, zh: '传送币', en: 'tfc' },
  { r: /([^a-zA-Z]|^)vtc([^a-zA-Z]|$)|绿币/i, zh: '绿币', en: 'vtc' },
  { r: /([^a-zA-Z]|^)xpm([^a-zA-Z]|$)|质数币/i, zh: '质数币', en: 'xpm' },
  { r: /([^a-zA-Z]|^)pgc([^a-zA-Z]|$)|乐园通/i, zh: '乐园通', en: 'pgc' },
  { r: /([^a-zA-Z]|^)game([^a-zA-Z]|$)|游戏点/i, zh: '游戏点', en: 'game' },
  { r: /([^a-zA-Z]|^)max([^a-zA-Z]|$)|最大币/i, zh: '最大币', en: 'max' },
  { r: /([^a-zA-Z]|^)fz([^a-zA-Z]|$)|冰河币/i, zh: '冰河币', en: 'fz' },
  { r: /([^a-zA-Z]|^)ktc([^a-zA-Z]|$)|肯特币/i, zh: '肯特币', en: 'ktc' },
  { r: /([^a-zA-Z]|^)ppc([^a-zA-Z]|$)|点点币/i, zh: '点点币', en: 'ppc' },
  { r: /([^a-zA-Z]|^)xsgs([^a-zA-Z]|$)|雪山古树/i, zh: '雪山古树', en: 'xsgs' },
  { r: /([^a-zA-Z]|^)ugt([^a-zA-Z]|$)/i, zh: 'UGT', en: 'ugt' },
  { r: /([^a-zA-Z]|^)eos([^a-zA-Z]|$)/i, zh: 'EOS', en: 'eos' }
]
module.exports = msg => {
  for (let coin of coins) {
    if (coin.r.test(msg)) {
      return axios.get(`https://www.jubi.com/api/v1/ticker/?coin=${coin.en}`)
      .then(res => {
        if (!res.data.last) {
          throw new Error(res.data)
        }
        return `${coin.en.toUpperCase()}对CNY实时价格: ${res.data.last * 1}\n(jubi.com)`
      })
    }
  }
}

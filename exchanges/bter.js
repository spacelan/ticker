const axios = require('axios')
const coins = [
  { r: /([^a-zA-Z]|^)btc([^a-zA-Z]|$)|比特币/i, en: 'btc' },
  { r: /([^a-zA-Z]|^)ltc([^a-zA-Z]|$)|莱特币/i, en: 'ltc' },
  { r: /([^a-zA-Z]|^)xrp([^a-zA-Z]|$)|瑞波币/i, en: 'xrp' },
  { r: /([^a-zA-Z]|^)qtum([^a-zA-Z]|$)|量子链/i, en: 'qtum' },
  { r: /([^a-zA-Z]|^)etp([^a-zA-Z]|$)|熵/i, en: 'etp' },
  { r: /([^a-zA-Z]|^)btrx([^a-zA-Z]|$)/i, en: 'btrx' },
  { r: /([^a-zA-Z]|^)bts([^a-zA-Z]|$)|比特股/i, en: 'bts' },
  { r: /([^a-zA-Z]|^)cnc([^a-zA-Z]|$)/i, en: 'cnc' },
  { r: /([^a-zA-Z]|^)rep([^a-zA-Z]|$)/i, en: 'rep' },
  { r: /([^a-zA-Z]|^)bat([^a-zA-Z]|$)/i, en: 'bat' },
  { r: /([^a-zA-Z]|^)snt([^a-zA-Z]|$)/i, en: 'snt' },
  { r: /([^a-zA-Z]|^)eos([^a-zA-Z]|$)/i, en: 'eos' },
  { r: /([^a-zA-Z]|^)doge([^a-zA-Z]|$)|狗狗币/i, en: 'doge' },
  { r: /([^a-zA-Z]|^)dash([^a-zA-Z]|$)/i, en: 'dash' },
  { r: /([^a-zA-Z]|^)eth([^a-zA-Z]|$)|以太坊/i, en: 'eth' },
  { r: /([^a-zA-Z]|^)etc([^a-zA-Z]|$)|以太经典/i, en: 'etc' },
  { r: /([^a-zA-Z]|^)ftc([^a-zA-Z]|$)/i, en: 'ftc' },
  { r: /([^a-zA-Z]|^)ifc([^a-zA-Z]|$)/i, en: 'ifc' },
  { r: /([^a-zA-Z]|^)nmc([^a-zA-Z]|$)/i, en: 'nmc' },
  { r: /([^a-zA-Z]|^)nxt([^a-zA-Z]|$)/i, en: 'nxt' },
  { r: /([^a-zA-Z]|^)ppc([^a-zA-Z]|$)/i, en: 'ppc' },
  { r: /([^a-zA-Z]|^)shell([^a-zA-Z]|$)/i, en: 'shell' },
  { r: /([^a-zA-Z]|^)tips([^a-zA-Z]|$)/i, en: 'tips' },
  { r: /([^a-zA-Z]|^)tix([^a-zA-Z]|$)/i, en: 'tix' },
  { r: /([^a-zA-Z]|^)xcp([^a-zA-Z]|$)/i, en: 'xcp' },
  { r: /([^a-zA-Z]|^)xmr([^a-zA-Z]|$)/i, en: 'xmr' },
  { r: /([^a-zA-Z]|^)xpm([^a-zA-Z]|$)/i, en: 'xpm' },
  { r: /([^a-zA-Z]|^)xtc([^a-zA-Z]|$)/i, en: 'xtc' },
  { r: /([^a-zA-Z]|^)xem([^a-zA-Z]|$)/i, en: 'xem' },
  { r: /([^a-zA-Z]|^)zec([^a-zA-Z]|$)/i, en: 'zec' },
  { r: /([^a-zA-Z]|^)ico([^a-zA-Z]|$)/i, en: 'ico' }
]
module.exports = msg => {
  for (let coin of coins) {
    if (coin.r.test(msg)) {
      return axios.get(`http://data.bter.com/api2/1/ticker/${coin.en}_cny`)
      .then(res => {
        if (!res.data.last) {
          throw new Error(res.data)
        }
        return `${coin.en.toUpperCase()}对CNY实时价格: ${res.data.last * 1}\n(bter.com)`
      })
    }
  }
}

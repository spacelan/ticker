const axios = require('axios')
const coins = [
  { r: /([^a-zA-Z]|^)btc([^a-zA-Z]|$)|比特币/i, en: 'BTC' },
  { r: /([^a-zA-Z]|^)eth([^a-zA-Z]|$)|以太坊/i, en: 'ETH' },
  { r: /([^a-zA-Z]|^)dgd([^a-zA-Z]|$)/i, en: 'DGD' },
  { r: /([^a-zA-Z]|^)bts([^a-zA-Z]|$)|比特股/i, en: 'BTS' },
  { r: /([^a-zA-Z]|^)sc([^a-zA-Z]|$)/i, en: 'SC' },
  { r: /([^a-zA-Z]|^)etc([^a-zA-Z]|$)|以太经典/i, en: 'ETC' },
  { r: /([^a-zA-Z]|^)1st([^a-zA-Z]|$)/i, en: '1ST' },
  { r: /([^a-zA-Z]|^)rep([^a-zA-Z]|$)/i, en: 'REP' },
  { r: /([^a-zA-Z]|^)ans([^a-zA-Z]|$)|小蚁股/i, en: 'ANS' },
  { r: /([^a-zA-Z]|^)zec([^a-zA-Z]|$)/i, en: 'ZEC' },
  { r: /([^a-zA-Z]|^)zmc([^a-zA-Z]|$)/i, en: 'ZMC' },
  { r: /([^a-zA-Z]|^)gnt([^a-zA-Z]|$)/i, en: 'GNT' },
  { r: /([^a-zA-Z]|^)qtum([^a-zA-Z]|$)|量子链/i, en: 'QTUM' },
  { r: /([^a-zA-Z]|^)gxs([^a-zA-Z]|$)|公信宝/i, en: 'GXS' },
  { r: /([^a-zA-Z]|^)eos([^a-zA-Z]|$)/i, en: 'EOS' }
]
module.exports = msg => {
  for (let coin of coins) {
    if (coin.r.test(msg)) {
      return axios.get(`https://yunbi.com//api/v2/tickers/${coin.en.toLowerCase()}cny.json`)
      .then(res => {
        if (!res.data.ticker.last) {
          throw new Error(res.data)
        }
        return `${coin.en}对CNY实时价格: ${res.data.ticker.last * 1}\n(yunbi.com)`
      })
    }
  }
}

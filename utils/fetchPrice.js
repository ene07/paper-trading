const axios = require('axios')

async function retrieveLatestEthPrice(asset) {
  const resp = await axios({
    // url: 'https://api.binance.com/api/v3/ticker/price',
    url: `https://api.coingecko.com/api/v3/simple/price?ids=${asset}&vs_currencies=eth`,
    method: 'get'
  })
  return resp
}

async function retrieveLatestUsdPrice(asset) {
  const resp = await axios({
    // url: 'https://api.binance.com/api/v3/ticker/price',
    url: `https://api.coingecko.com/api/v3/simple/price?ids=${asset}&vs_currencies=usd`,
    method: 'get'
  })
  return resp
}

module.exports = {
  retrieveLatestEthPrice,
  retrieveLatestUsdPrice
};
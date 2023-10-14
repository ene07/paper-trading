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


async function retrieveLatestUsd(asset) {
  const options = {
    method: 'GET',
     url: `https://api.dev.dex.guru/v1/chain/1/tokens/${contract}/market/history?begin_timestamp=1588723228`,
     headers: {
       accept: 'application/json',
      'api-key': 'jVWBkdwJXDo9H-n7fyGcM9z5Bu-h98XrkxKxPzkcX0c'
     }
  };
  
     const response=   await axios.request(options)
     const data= response.data.data[response.data.total-1] 
     console.log(data,"datat")
     const priceEth=data?.price_eth
  // return resp
}

module.exports = {
  retrieveLatestEthPrice,
  retrieveLatestUsdPrice
};
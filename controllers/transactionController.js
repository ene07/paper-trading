const admin = require("firebase-admin");
const axios = require('axios')
// const Web3 = require("web3")
// const IERC20 = require('@uniswap/v2-periphery/build/IERC20.json')

// const wss="https://eth-mainnet.g.alchemy.com/v2/-dsGUE0osTIPnOyCSZjHdOK_HWdxb85U"
// const web3 = new Web3(wss)



const {retrieveLatestEthPrice,retrieveLatestUsdPrice }= require('../utils/fetchPrice') 
     const tokens=[
        {
          "symbol": "usdc",
          "img": "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
          "name": "USD Coin",
          "id": "usd-coin",
          "contract":"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" 
        },
        {
          "symbol": "usdt",
          "img": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663",
          "name": "Tether",
          "id": "tether",
          "contract":"0xdAC17F958D2ee523a2206206994597C13D831ec7"
        },
        {
          "symbol": "dai",
          "img": "https://assets.coingecko.com/coins/images/9956/large/Badge_Dai.png?1687143508",
          "contract":"0x6B175474E89094C44Da98b954EedeAC495271d0F",
          "name": "Dai",
          "id": "dai"
        },
        {
          "symbol": "wbtc",
          "img": "https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1548822744",
          "price": 27137,
          "name": "Wrapped Bitcoin",
          "id": "wrapped-bitcoin",
          "contract":"0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
        },
        {
          "symbol": "uni",
          "img": "https://assets.coingecko.com/coins/images/12504/large/uni.jpg?1687143398",
          "price": 4.37,
          "name": "Uniswap",
          "id": "uniswap",
          "contract": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
        },
        {
          "symbol": "link",
          "img": "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1547034700",
          "price": 6.92,
          "name": "Chainlink",
          "id": "chainlink",
          "contract": "0x514910771AF9Ca656af840dff83E8264EcF986CA"
        },
        {
          "symbol": "aave",
          "img": "https://assets.coingecko.com/coins/images/12645/large/AAVE.png?1601374110",
          "price": 63.48,
          "name": "Aave",
          "id": "aave",
          "contract": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
        },
        {
          "symbol": "mkr",
          "img": "https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png?1585191826",
          "price": 1316.88,
          "name": "Maker",
          "id": "maker",
          "contract": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"
        },
        {
          "symbol": "okb",
          "img": "https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png?1585191826",
          "price": 1316.88,
          "name": "OKB",
          "id": "maker",
          "contract": "0x75231F58b43240C9718Dd58B4967c5114342a86c"
        },
        {
          "symbol": "grt",
          "img": "https://etherscan.io/token/images/TheGraph_32.png",
          "price": 1316.88,
          "name": "Graph Token",
          "id": "maker",
          "contract": "0xc944e90c64b2c07662a292be6244bdf05cda44a7"
        },
        {
          "symbol": "rndr",
          "img": "https://etherscan.io/token/images/Render2_32.png",
          "price": 1316.88,
          "name": "Render Token",
          "id": "maker",
          "contract": "0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24"
        },
        {
          "symbol": "THETA",
          "img": "https://etherscan.io/token/images/theta_28.png",
          "price": 1316.88,
          "name": "Theta Token",
          "id": "maker",
          "contract": "0x3883f5e181fccaf8410fa61e12b59bad963fb645"
        },
        {
          "symbol": "hex",
          "img": "https://etherscan.io/token/images/theta_28.png",
          "price": 1316.88,
          "name": "HEX",
          "id": "maker",
          "contract": "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39"
        },
        {
          "symbol": "kcs",
          "img": "https://etherscan.io/token/images/kucointoken_32.png",
          "price": 1316.88,
          "name": "KuCoin Token",
          "id": "maker",
          "contract": "0xf34960d9d60be18cc1d5afc1a6f012a723a28811"
        },
        {
          "symbol": "usdd",
          "img": "https://etherscan.io/token/images/usdd-tron_32.png",
          "price": 1316.88,
          "name": "Decentralizes USD",
          "id": "maker",
          "contract": "0x0C10bF8FcB7Bf5412187A595ab97a3609160b5c6"
        },
        {
          "symbol": "frax",
          "img": "https://etherscan.io/token/images/usdd-tron_32.png",
          "price": 1316.88,
          "name": "Frax",
          "id": "maker",
          "contract": "0x853d955acef822db058eb8505911ed77f175b99e"
        },
        {
          "symbol": "frax",
          "img": "https://etherscan.io/token/images/usdd-tron_32.png",
          "price": 1316.88,
          "name": "Frax",
          "id": "maker",
          "contract": "0x853d955acef822db058eb8505911ed77f175b99e"
        },
        {
          "symbol": "dydx",
          "img": "https://etherscan.io/token/images/dydx2_32.png",
          "price": 1316.88,
          "name": "dydx",
          "id": "maker",
          "contract": "0x92d6c1e31e14520e676a687f0a93788b716beff5"
        },
        {
          "symbol": "ape",
          "img": "https://etherscan.io/token/images/apecoin_32.png",
          "price": 1316.88,
          "name": "Apecoin",
          "id": "maker",
          "contract": "0x4d224452801aced8b2f0aebe155379bb5d594381"
        },
        {
          "symbol": "cake",
          "img": "https://etherscan.io/token/images/pancake_32.png?v=2",
          "price": 1316.88,
          "name": "PancakeSwap Token ",
          "id": "maker",
          "contract": "0x152649eA73beAb28c5b49B26eb48f7EAD6d4c898"
        },
        {
          "symbol": "rpl",
          "img": "https://etherscan.io/token/images/Rocketpool_32.png",
          "price": 1316.88,
          "name": " Rocket Pool ",
          "id": "maker",
          "contract": "0xd33526068d116ce69f19a9ee46f0bd304f21a51f"
        },
        {
          "symbol": "rlb",
          "img": "https://etherscan.io/token/images/rollbitcoin_32.png",
          "price": 1316.88,
          "name": " Rollbit Coin ",
          "id": "maker",
          "contract": "0x046eee2cc3188071c02bfc1745a6b17c656e3f3d"
        },
        {
          "symbol": "ilv",
          "img": "https://etherscan.io/token/images/illuvium_32.png",
          "price": 1316.88,
          "name": "Illuvium",
          "id": "maker",
          "contract": "0x767fe9edc9e0df98e07454847909b5e959d7ca0e"
        },
        {
          "symbol": "fet",
          "img": "https://etherscan.io/token/images/fetch_32.png?v=2",
          "price": 1316.88,
          "name": "Illuvium",
          "id": "maker",
          "contract": "0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85"
        },
        {
          "symbol": "sand",
          "img": "https://etherscan.io/token/images/sand_32.png",
          "price": 1316.88,
          "name": "SAND",
          "id": "maker",
          "contract": "0x3845badAde8e6dFF049820680d1F14bD3903a5d0"
        },
        {
          "symbol": "ftm",
          "img": "https://etherscan.io/token/images/fantomtoken_32.png",
          "price": 1316.88,
          "name": "Fantom token",
          "id": "maker",
          "contract": "0x4e15361fd6b4bb609fa63c81a2be19d873717870"
        },
        {
          "symbol": "stETH",
          "img": "https://etherscan.io/token/images/lido-steth_32.png",
          "price": 1316.88,
          "name": "stETH",
          "id": "maker",
          "contract": "0xae7ab96520de3a18e5e111b5eaab095312d7fe84"
        },
        {
          "symbol": "TONCOIN",
          "img": "https://etherscan.io/token/images/theopennetwork_32.png",
          "price": 1316.88,
          "name": "Wrapped TON Coin",
          "id": "maker",
          "contract": "0x582d872a1b094fc48f5de31d3b73f2d9be47def1"
        },
        {
          "symbol": "LEO",
          "img": "https://etherscan.io/token/images/leo_28_2.png",
          "price": 1316.88,
          "name": "Bitfinex LEO Token ",
          "id": "maker",
          "contract": "0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3"
        },
        {
          "symbol": "TUSD",
          "img": "https://etherscan.io/token/images/trueusd_32.png?v=2",
          "price": 1316.88,
          "name": "TrueUSD ",
          "id": "maker",
          "contract": "0x0000000000085d4780B73119b644AE5ecd22b376"
        },
        {
          "symbol": "CRO",
          "img": "https://etherscan.io/token/images/cronoseth_32.png",
          "price": 1316.88,
          "name": "Cronos Coin",
          "id": "maker",
          "contract": "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b"
        },
        {
          "symbol": "LDO",
          "img": "https://etherscan.io/token/images/lido-dao_32.png",
          "price": 1316.88,
          "name": "Lido DAO Token ",
          "id": "maker",
          "contract": "0x5a98fcbea516cf06857215779fd812ca3bef1b32"
        },
        {
          "symbol": "IMX",
          "img": "https://etherscan.io/token/images/immutable_32.png",
          "price": 1316.88,
          "name": "Immutable X ",
          "id": "maker",
          "contract": "0xf57e7e7c23978c3caec3c3548e3d615c346e79ff"
        },
        {
          "symbol": "IMX",
          "img": "https://etherscan.io/token/images/immutable_32.png",
          "price": 1316.88,
          "name": "Immutable X ",
          "id": "maker",
          "contract": "0xf57e7e7c23978c3caec3c3548e3d615c346e79ff"
        },




    
    
    
    
    

    

    
        ]


 exports.saveTrade= async (req, res, next) => {

     const { amount,uid,contract} = req.body;

     const assetId=tokens.find((token)=>token.contract ===contract).id
     console.log(assetId,"ass")
      const timestamp= Date.now()
      console.log(timestamp,"time")
      try{
        const options = {
           method: 'GET',
           url: `https://api.dev.dex.guru/v1/chain/1/tokens/${contract}/market/history?begin_timestamp=1588723228`,
           headers: {
             accept: 'application/json',
            'api-key': 'jVWBkdwJXDo9H-n7fyGcM9z5Bu-h98XrkxKxPzkcX0c'
           }
        };
        
          const response=   await axios.request(options)
          const newbalUsd= 1642.31 * Number(amount)
        
          const data= response.data.data[response.data.total-1] 
          console.log(data,"datat")
          const priceEth=data?.price_eth
          const priceUSd=data?.price_usd


          const db=admin.firestore();
           const userRef = db.collection('users').doc(uid)
           const doc = await userRef.get();
           console.log(doc.data().balance > amount,"docoo")



             
           if( doc.data()?.balance < amount) {
              throw new Error(" You dont have enough paper ETH to trade ")

           }else{ 
           
           if( !doc.data().isEligible) {
             throw new Error(" You exceed your transaction limit of 7")
           }else{
                
                // const result =await retrieveLatestEthPrice(assetId)
                
                // const price= result?.data[assetId]?.eth
                const amountOut=Number(amount) / Number(priceEth)
                console.log(amountOut,"out btc")
      
                // const priceusd =await retrieveLatestUsdPrice(assetId)
      
                const amountUsd=Number(priceUSd) * amountOut
                console.log(amountUsd,"usd")
                
                const profit = amountOut - amountOut
      
      
      
                  const tx={
                      trader:doc.id,
                      pair:assetId,
                      amount:amountOut,
                      usd:amountUsd,
                      date:Date.now()
                      
                    }
                    const txResult= await db.collection('transactions').add(tx);
                    console.log(txResult,"txResult")
                    const txRef = db.collection('transactions').doc(txResult.id);
                    const txDoc = await txRef.get();
                    console.log(txDoc.data())
                    const tokenDoc=await db.collection("users").doc(uid).collection("tokens").doc(assetId).get()
                  if(doc.data()?.tradedPairs?.includes(assetId)){
                  
      
      
                    
                
                        ( db.
                          collection("users").
                          doc(uid).
                          collection("tokens").
                          doc(assetId).update(
                                  { 
                                      balance:amountOut + tokenDoc?.data()?.balance,
                                      totalUSD:amountUsd + tokenDoc?.data()?.totalUSD,
      
                                    }))
      
                    }else{
                      const tokenRef = db.
                      collection('users').
                      doc(uid).collection("tokens")
                        .doc(assetId).
                      set({
                          name:assetId,
                          balance:Number(amountOut),
                          totalUSD:Number(amountUsd)
      
                      })
                  
      
                  }    
                  
                  if(doc.data()?.tradedPairs?.includes(assetId)){
                          if(doc.data()?.premium){

                          
                               ( db.collection("users").doc(uid)).update({
                                  trades:Number(doc.data()?.trades) + 1,
                                  isEligible:true,
                                  balance:Number(doc.data()?.trades) - amount,
                                  balanceUsd:Number(doc.data()?.balanceUsd) -newbalUsd
                
                                })
                              }else{
                                  if(doc.data().freeTx ==0){
                                       ( db.collection("users").doc(uid)).update({
                                         trades:Number(doc.data()?.trades) + 1,
                                         isEligible:false,
                                         balance:Number(doc.data()?.trades) - amount,
                                         balanceUsd:Number(doc.data()?.balanceUsd) -newbalUsd
                       
                      
                                      })

                                      throw new Error("You have exceeded your trading limit")


                                  }else{
                                     ( db.collection("users").doc(uid)).update({
                                       trades:Number(doc.data()?.trades) + 1,
                                       freeTx:Number(doc.data()?.freeTx) -1,
                                       balance:Number(doc.data()?.trades) - amount,
                                       balanceUsd:Number(doc.data()?.balanceUsd) -newbalUsd
                     
                    
                      
                                    })

                                  }


                              }
                        }else{
                      
                          ( db.collection("users").doc(uid)).update({
                          trades:Number(doc.data()?.trades) + 1,
                          tradedPairs:[...doc.data()?.tradedPairs,assetId],
                          balance:Number(doc.data()?.trades) - amount,
                          balanceUsd:Number(doc.data()?.balanceUsd) -newbalUsd
                          })
      
                        }

                        res.status(200).json({
                          status: 'Success',     
                          data:txDoc.data()
                        });
          
                      }
           

                }

        }catch(e){
          console.log(e)
          res.status(403).json({
            status: 'failed',
            error:e.message
        });
      }


 }
 



 exports.getTransactions= async (req, res, next) => {
       const {uid,number,all} = req.body;     
   
  
       try{
        const db=admin.firestore();
        const transactions=[]
        const userRef = db.collection('users').doc(uid);
        const doc = await userRef.get();
        const txRef = db.collection('transactions');
        const query = (await txRef.where('trader', '==', doc.data()?.id).get()).docs
        const amount=[]
        const date=[]
        query.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          amount.push(doc.data()?.usd)
          date.push(doc.data()?.date)
        });
        
        const data={
          amount:amount,
          date:date
        }


        const dates = data.date.map(timestamp => new Date(timestamp));

 
        const groupedData = dates.reduce((acc, date, index) => {
          const weekStartDate = new Date(date);
          weekStartDate.setDate(date.getDate() - date.getDay()); 
       
          const currentDate = new Date(date);
          const startDate = new Date(weekStartDate);
          const weekCount = Math.ceil((currentDate - startDate) / (7 * 24 * 60 * 60 * 1000)) + 1;
        

          while (acc.length < weekCount) {
            acc.push({
              amount: [],
              date: [],
            });
          }
        
   
          const weekIndex = weekCount - 1;
          acc[weekIndex].amount.push(data.amount[index]);
          acc[weekIndex].date.push(data.date[index]);
        
          return acc;
        }, []);
        
        console.log();
        const amounts=[]
        const time=[]
       if(all){
        groupedData.slice(0,groupedData?.length).map((data)=>{
          console.log(data,"dats")
          amounts.push(...data?.amount)
          time.push(...data?.date)
             
        } )

       }else{
        groupedData.slice(0,number).map((data)=>{
          console.log(data,"dats")
          amounts.push(...data?.amount)
          time.push(...data?.date)
             
        } )

       }

       

        





         res.status(200).json({
           status: 'Success',
           data:{
             amount:amounts,
             date:time
           }
         });

        }catch(e){
         console.log(e)
        }
    
   }

 exports.getPairs= async (req, res, next) => {
  
     let list=[]
    try{
         
      
    
     
      await Promise.all(tokens.map(async (token) => {
        const options = {
          method: 'GET',
          url: `https://api.dev.dex.guru/v1/chain/1/tokens/${token.contract}/market/history?begin_timestamp=1588723228`,
          headers: {
            accept: 'application/json',
            'api-key': 'jVWBkdwJXDo9H-n7fyGcM9z5Bu-h98XrkxKxPzkcX0c'
          }
        };
  
        const response = await axios.request(options);
        const data = response.data.data[response.data.total - 1];
        console.log(data, "datat");
        const priceEth = data?.price_eth;
        const priceUSd = data?.price_usd;
  
        token["price"] = priceUSd;
        list.push(token);
        console.log(token);
      }));
         res.status(200).json({
          status: 'Success',
          data:list
        });


   }catch(e){
    console.log(e)
     res.status(403).json({
      status: 'failed',
      error:e.message
      });
   }

}


exports.getUserProfile= async (req, res, next) => {    
   const {uid} = req.body;
    //  const uid="GMIl8Sl0lAOK9sydS76HDKfn10i1"
    try{
      const db=admin.firestore();
      const userRef = db.collection('users').doc(uid);
      const doc = await userRef.get();
      console.log(doc,"doc user")
      res.status(200).json({
        status: 'success',
        data:{
           id: doc?.id,
           ...doc.data()
          }
    });
    }catch(e){
      console.log(e)
      res.status(403).json({
        status: 'failed',
        error:e.message
        });
    }
}



exports.getUserPortfolio= async (req, res, next) => {
      
     const {uid} = req.body;
    // const uid="GMIl8Sl0lAOK9sydS76HDKfn10i1"
     try{
      console.log("runinggg")
      const db=admin.firestore();
      const tokenRef= db.collection("users").doc(uid).collection("tokens")
      const snapshot= (await tokenRef.get()).docs
      console.log(snapshot,"iii")

      const resp = await axios({
        url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en',
        method: 'get'
      })
      const result =resp.data

      const portfolio=[]
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data())
         const token=result.find((token)=>token.id ==doc.id)
         console.log(token,"tokennn")
          portfolio.push({
            id:doc.id,
            img:token.image,
            totalUsd:doc.data().totalUSD,
            balance:doc.data().balance,
            profit:0,
            spent:0
           })
      });

      res.status(200).json({
        status: 'Success',
        data:portfolio
      });

      
      }catch(e){
          console.log(e)
          res.status(403).json({
            status: 'failed',
            error:e.message
            });
      }
}


exports.leaderBoard= async (req, res, next) => {

    try{
        const db=admin.firestore();
        const userRef = db.collection('users');
        const snapshot = await userRef.get();
        const users=[]
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
           users.push({id:doc.id,
          
            username:doc.data().username,
            wallet:doc.data().wallet,
            trades:doc.data().trades,
            tradedPairs:doc.data().tradedPairs,
            paperBalance:doc.data().paperBalance,
            totalProfit:doc.data().totalProfit,
            balance:doc.data().balance} )
        });


        res.status(200).json({
          status: 'Success',
          data:users
        });
      

      }catch(e){
        console.log(e)
        res.status(403).json({
          status: 'failed',
          error:e.message
          });
      }


}



exports.deposit= async (req, res, next) => {
  const { deposit,uid} = req.body;
  // const uid="GMIl8Sl0lAOK9sydS76HDKfn10i1"
  // const deposit=0.5
 try{
    const db=admin.firestore();
    const userRef = db.collection('users').doc(uid)
    const doc = await userRef.get();

    const priceusd =await retrieveLatestUsdPrice("ethereum")

    const amountUsd=Number(priceusd.data["ethereum"].usd) * deposit
     const usdbalance= doc?.data()?.balanceUsd===undefined? 0:doc?.data()?.balanceUsd
     db.collection('users').doc(uid).update(
         { 
           balance:deposit + doc?.data()?.balance,
           balanceUsd:amountUsd + usdbalance,

       })
       const newdoc = await userRef.get();

       res.status(200).json({
        status: 'Success',
        data:newdoc.data()
      });

   }catch(e){
    console.log(e)
    res.status(403).json({
      status: 'failed',
      error:e.message
      });

}

}




exports.getCharts= async (req, res, next) => {
  const {assetId} = req.body

  // const assetId="chainlink"

  const db=admin.firestore();

  try{
      //  const chartRef = db.collection('charts');
     const resp = await axios({
        url: `https://api.coingecko.com/api/v3/coins/${assetId}/ohlc?vs_currency=usd&days=14`,
        method: 'get'
      })
      const chart=[]
      console.log(resp.data)
       resp.data.map((token)=>{
     

          chart.push({
            x:token[0],
            y:[...token.slice(1,5)],
           
        })


       })

      //  console.log(chart)
      //  chartRef.doc(assetId).set({data:chart}).then((res)=>{
      //   console.log(res)

      //  }).catch((e)=>{
      //   console.log(e)

      //  })

       console.log("done")

    // const chartRef = db.collection('charts').doc(assetId);
    // const doc = await chartRef.get();
    // res.status(200).json({
    //   status: 'success',
    //   data:{
    //      id: doc?.id,
    //      ...doc.data()
    //     }
    //   })


     
      
      res.status(200).json({
        status: 'Success',
        data:chart
      });
  }catch(e){
    console.log(e)
    res.status(403).json({
      status: 'failed',
      error:e.message
      });
  }
}



exports.getTokenDetails= async (req, res, next) => {
      // const {assetId,} = req.body;
        const contract="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" 
    try{
          // const apiKey = 'bkRyeOHGKRvs13_pUqWk29ripcV7BLrY';
          // const apiUrl = 'https://api.polygon.io/v2/aggs/ticker/X:BTCUSD/range/2/day/2023-09-01/2023-10-03?adjusted=true&sort=asc&limit=120';
          
          // const params = {
          //   adjusted: true,
          //   sort: 'asc',
          //   limit: 120,
          //   apiKey: apiKey,
          // };
          
          // axios.get(apiUrl, { params })
          //   .then((response) => {
          //     console.log(response.data);
          //   })
          //   .catch((error) => {
          //     console.error('Error:', error);
          //   });


        //  const token = new web3.eth.Contract(IERC20.abi,contract)
        //  const  symbol = await token.methods.symbol().call()

        //  console.log(symbol,'symen')

          // const apiKey = '8ABCABED-3CBC-4810-8DD0-EBA27C71B1DF';
          // // 'https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_LINK_USD/latest?period_id=1MIN'
    
          // axios.get("https://rest.coinapi.io/v1/symbols/BINANCE", {
          //   headers: {
          //     'X-CoinAPI-Key': apiKey
          //   }
          // })
          // .then((response) => {
          //   console.log("Ressss")
          //   console.log(response.data);
          //   console.log(response.data.find((data)=>data?.asset_id_base ==symbol),"hhhh");
          // })
          // .catch((error) => {
          //   console.error('Error:', error);
          // });
         
        //   const apiKey = '8ABCABED-3CBC-4810-8DD0-EBA27C71B1DF';
        //   // 'https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_LINK_USD/latest?period_id=1MIN'
        // //  https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/history?period_id=1MIN&time_start=2023-10-01T00:00:00 \
  
         
        //   axios.get(` https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/history?period_id=1MIN&time_start=2023-10-01T00:00:00`, {
        //     headers: {
        //       'X-CoinAPI-Key': apiKey
        //     }
        //   })
        //   .then((response) => {
        //     console.log("Ressss")
        //     console.log(response.data);
         
        //   })
        //   .catch((error) => {
        //     console.error('Error:', error);
        //   });
  

       
       }catch(e){
      console.log(e)
    }

}





exports.getChartByContractAddress= async (req, res, next) => {
  const {contract} = req.body;
  // const contract="0x514910771AF9Ca656af840dff83E8264EcF986CA"
  // const db=admin.firestore();
  // const chartRef = db.collection('charts');

    try{
    //   const doc = await chartRef.where('state', '==', 'CA');
    //   const resp = await axios({
    //     url: `https://api.geckoterminal.com/api/v2/networks/eth/tokens/${contractAddress}`,
    //     method: 'get'
    //   })

    //   console.log(resp.data?.data?.attributes)

    // const res2 = await axios({
    //     url: 'https://api.coingecko.com/api/v3/coins/list',
    //     method: 'get'
    //   })
    //  const data= res2?.data?.filter((token)=>token?.symbol ==resp.data?.data?.attributes?.symbol?.toLowerCase())
  
    //  console.log(data[0],"data")
        
    //       const res3= await axios({
    //           url: `https://api.coingecko.com/api/v3/coins/${data[0]?.id}/ohlc?vs_currency=usd&days=14`,
    //           method: 'get'
    //         })
    //         const chart=[]
    //         console.log(resp.data)
    //         res3.data.map((token)=>{
          

    //             chart.push({
    //               x:token[0],
    //               y:[...token.slice(1,5)],
                
    //            })


    //          })
    //         const res4 = await axios({
    //           url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=300&page=1&sparkline=false&locale=en',
    //           method: 'get'
    //         })
    //         console.log(data[0]?.id,"res444")
    //         const img=res4.data?.find((token)=>token.symbol ==data[0]?.symbol)?.image
    //         console.log(img,"imag")
    //         const attributes=resp.data?.data?.attributes
    //         attributes["img"]=img
    //         res.status(200).json({
    //         status: 'Success',
    //         data:{
    //           details:attributes,
    //           chart:chart
    //           }
    //       });

    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

    console.log(currentTimestampInSeconds)



       
        const opt = {
          method: 'GET',
          url: `https://api.dev.dex.guru/v1/chain/1/tokens/${contract}/market/history?begin_timestamp=1588723228`,
          headers: {
            accept: 'application/json',
            'api-key': 'jVWBkdwJXDo9H-n7fyGcM9z5Bu-h98XrkxKxPzkcX0c'
          }
        };
    
        const detail=   await axios.request(opt)
        const data= detail.data.data[detail.data.total-1] 
        console.log(data,"datat")

        const opt2 = {
          method: 'GET',
          url: `https://api.dev.dex.guru/v1/chain/1/tokens/${contract}`,
          headers: {
            accept: 'application/json',
            'api-key': 'jVWBkdwJXDo9H-n7fyGcM9z5Bu-h98XrkxKxPzkcX0c'
          }
        };

   
        
     const inventory= await axios.request(opt2)
     console.log(inventory.data["symbol"],inventory.data["name"],"tory")
     data["symbol"]=inventory.data["symbol"]
     data["name"]=inventory.data["name"]

           try{

              const resp = await axios({
                url: ` https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`,
                method: 'get'
              })
              console.log(resp.data,"resppp")
              const symbol=inventory.data["symbol"]
              console.log(symbol.toLowerCase(),"symbol")
               const token= resp.data.find((coin)=>coin.symbol===symbol.toLowerCase())
               console.log(token,"tokenn")
               data["img"]=token.image
               data["market_cap"]=token.market_cap
               data["total_volume"]=token.total_volume
               data["total_supply"]=token.total_supply
               data["change_percentage_today"]=token.price_change_percentage_24h
               data["all_high_24h"]=token.high_24h
          }catch(e){
          console.log(e)
          }


        const options = {
          method: 'GET',
          url: `https://api.dev.dex.guru/v1/tradingview/history?symbol=${contract}-eth_USD&resolution=1D&from=1691072145&to=${currentTimestampInSeconds}`,
          headers: {
            accept: 'application/json',
            'api-key': 'jVWBkdwJXDo9H-n7fyGcM9z5Bu-h98XrkxKxPzkcX0c'
          }
        };
        
       const response=await axios .request(options)
       const chart=[]

      //  console.log(response.data["t"],"t")

      //  console.log(response.data["o"],"o")
      //  console.log(response.data["c"],"c")
      //  console.log(response.data["h"],"h")
      //  console.log(response.data["l"],"l")
      //  console.log(response.data["v"],"v")
        

       response.data["t"].map((l,i)=>{
          console.log(l,i)
          chart.push({
            x:l,
            y:[response.data["o"][i],response.data["h"][i],response.data["l"][i],response.data["c"][i]]
          })

        })

          
        res.status(200).json({
            status: 'Success',
            data:{
              details:data,
              chart:chart
              }
          });
    }catch(e){ 
      console.log(e)
      res.status(403).json({
        status: 'failed',
        error:e.message
        });
    }
}



const getPrice=async(contract)=>{
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
    const priceUSd=data?.price_usd

    return  priceUSd

    res.status(200).json({
      status: 'Success',
      data:list
    });
}
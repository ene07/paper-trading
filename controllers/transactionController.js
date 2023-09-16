const admin = require("firebase-admin");
const axios = require('axios')
const {retrieveLatestEthPrice }= require('../utils/fetchPrice') 
// const IFactory = require('@uniswap/v2-core/build/IUniswapV2Factory.json')
// const IPair = require('@uniswap/v2-core/build/IUniswapV2Pair.json')  
// const IRouter = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json')
// const IERC20 = require('@uniswap/v2-periphery/build/IERC20.json')

// const addrSFactory = "0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac"
// const addrSRouter ="0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F"
// const addrUFactory ="0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
// const addrURouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"

// const wss="wss://mainnet.infura.io/ws/v3/85fc7c4c61664a96808975adbb581787"
// const web3 = new Web3(wss)
// const uRouter = new web3.eth.Contract(IRouter.abi,addrURouter)

// const eth="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

 exports.saveTrade= async (req, res, next) => {

     const { amount,uid,assetAddress,pair } = req.body;

      try{

          const db=admin.firestore();
          const userRef = db.collection('users').doc(uid)
          const doc = await userRef.get();

          // const  ethToken = new web3.eth.Contract(IERC20.abi,eth)
          // const assetToken = new web3.eth.Contract(IERC20.abi,asset)
          // const amountInWei = web3.utils.toWei(amount.toString(), 'ether')

          // const amountOut =await uRouter.methods.getAmountsOut(1,[eth,"0x6B175474E89094C44Da98b954EedeAC495271d0F"]).call()

          // console.log(amountOut,"outt")

          const price =await retrieveLatestEthPrice(pair)
          const amountOut=Number(amount) / Number(price)
          console.log(amountOut,"amount")

          const usd =await retrieveLatestEthPrice("ETHUSDT")

          const amountUsd= price * usd
          console.log(amountUsd,"usd")


            const tx={
                trader:doc.data()?.id,
                pair:pair,
                amount:amountOut,
                usd:amountUsd,
                date:Date.now()
                
              }
             const txResult= await db.collection('transactions').add(tx);
             const txRef = db.collection('transactions').doc(txResult.id);
             const txDoc = await txRef.get();
             console.log(doc.data()?.tradedPairs?.includes(pair),"pairrr old")
         
          //  const newuserRef = db.collection('users').doc(uid)
          //  const newdoc = await newuserRef.get();   
              
          //   console.log(newdoc.data()?.tradedPairs?.includes(pair),"pair new")
            const tokenDoc=await db.collection("users").doc(uid).collection("tokens").doc(pair).get()
            if(doc.data()?.tradedPairs?.includes(pair)){
            


             
         
                  ( db.
                    collection("users").
                    doc(uid).
                    collection("tokens").
                    doc(pair).update(
                           { 
                                balance:amountOut + tokenDoc?.data()?.balance,
                                totalUSD:amountUsd + tokenDoc?.data()?.totalUSD,

                              }))

              }else{
                const tokenRef = db.
                collection('users').
                doc(uid).collection("tokens")
                  .doc(pair).
                set({
                    name:pair,
                   balance:Number(amountOut),
                   totalUSD:Number(amountUsd)

                })
            

           }    
           
            if(doc.data()?.tradedPairs?.includes(pair)){
               ( db.collection("users").doc(uid)).update({
                          trades:Number(doc.data()?.trades) + 1,
          
                         })
                 }else{
                   ( db.collection("users").doc(uid)).update({
                    trades:Number(doc.data()?.trades) + 1,
                    tradedPairs:[...doc.data()?.tradedPairs,pair]
                   })

                 }
    
            
            res.status(200).json({
              status: 'Success',     
              data:txDoc.data()
            });
          



        }catch(e){
          console.log(e)
          res.status(403).json({
            status: 'failed',
            error:e.message
        });
      }


 }
 



 exports.getTransactions= async (req, res, next) => {
       const {uid} = req.body;
       try{
        const db=admin.firestore();
        const transactions=[]
        const userRef = db.collection('users').doc(uid);
        const doc = await userRef.get();
        const txRef = db.collection('transactions');
        const query = (await txRef.where('trader', '==', doc.data()?.id).get()).docs
        query.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          transactions.push({id:doc.id,...doc.data()})
        });
        
        
         res.status(200).json({
           status: 'Success',
           data:transactions
         });

        }catch(e){
         console.log(e)
        }
    
   }

 exports.getPairs= async (req, res, next) => {
  
    try{
      const resp = await axios({
        url: 'https://api.binance.com/api/v3/ticker/price',
        method: 'get'
      })
      console.log(resp.data) 
      
      res.status(200).json({
        status: 'Success',
        data:resp.data
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
     try{
      console.log("runinggg")
      const db=admin.firestore();
      const tokenRef= db.collection("users").doc(uid).collection("tokens")
      const snapshot= (await tokenRef.get()).docs
      console.log(snapshot,"iii")

      const portfolio=[]
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data())
        portfolio.push({
            id:doc.id,
            ...doc.data()
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
           users.push({id:doc?.id,...doc.data()})
        });


        res.status(200).json({
          status: 'Success',
          data:users
        });
      

     }catch(e){
      console.log(e)
     }


}
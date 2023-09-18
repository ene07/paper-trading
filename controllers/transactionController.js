const admin = require("firebase-admin");
const axios = require('axios')
const {retrieveLatestEthPrice,retrieveLatestUsdPrice }= require('../utils/fetchPrice') 


 exports.saveTrade= async (req, res, next) => {

     const { amount,uid,assetId} = req.body;

      // const amount=0.5
      // const uid="5ie9ugD4lXNn87iMS4s0x4E6fXW2"
      // const assetId="bitcoin"
      try{

          const db=admin.firestore();
          const userRef = db.collection('users').doc(uid)
          const doc = await userRef.get();
           console.log(doc.data(),"docoo")
          const result =await retrieveLatestEthPrice(assetId)
          
           const price= result?.data[assetId]?.eth
          const amountOut=Number(amount) / Number(price)
          console.log(amountOut,"out")

          const priceusd =await retrieveLatestUsdPrice(assetId)

          const amountUsd=Number(priceusd.data[assetId].usd) * amountOut
          console.log(amountUsd,"usd")


            const tx={
                trader:doc.data()?.id,
                pair:assetId,
                amount:amountOut,
                usd:amountUsd,
                date:Date.now()
                
              }
             const txResult= await db.collection('transactions').add(tx);
             const txRef = db.collection('transactions').doc(txResult.id);
             const txDoc = await txRef.get();
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
               ( db.collection("users").doc(uid)).update({
                          trades:Number(doc.data()?.trades) + 1,
          
                         })
                 }else{
                   ( db.collection("users").doc(uid)).update({
                    trades:Number(doc.data()?.trades) + 1,
                    tradedPairs:[...doc.data()?.tradedPairs,assetId]
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
      // const resp = await axios({
      //   url: 'https://api.binance.com/api/v3/ticker/price',
      //   method: 'get'
      // })
      const resp = await axios({
        url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en',
        method: 'get'
      })
      const result =resp.data
      console.log(result,"result ,,,")
         const tokens=[]
        result.map((token)=>{
          tokens.push({name:token?.name,symbol:token?.symbol,price:token?.current_price,id:token?.id})

        })
      
      res.status(200).json({
        status: 'Success',
        data:tokens
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
          
            username:doc.data().username,
            wallet:doc.data().wallet,
            trades:doc.data().trades,
            tradedPairs:doc.data().tradedPairs,
            balance:doc.data().balance,
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
            balance:doc.data().balance} )
        });


        res.status(200).json({
          status: 'Success',
          data:users
        });
      

     }catch(e){
      console.log(e)
     }


}
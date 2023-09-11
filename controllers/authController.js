
const admin = require("firebase-admin");
const bcrypt = require('bcrypt');
const crypto = require('crypto');


exports.signUp = async (req, res, next) => {
    const { password, email } = req.body;
    try{
      
        const db=admin.firestore();
        const signInCred = {
            email,
            password,
          };
        signInCred.password = await bcrypt.hash(password, 12);
        const user = await admin.auth().createUser(signInCred)
        console.log( user,"user")
        const userData = {
            id:user.uid,
            username: req.body.username,
            email: req.body.email,
          }
        const data=await db.collection("users").doc(user.uid).set(userData)
        const userRef = db.collection('users').doc(user?.uid);
         const doc = await userRef.get();

        res.status(200).json({
            status: 'success',
            data:doc?.data()
        });



    }catch(e){
        console.log(e)
        res.status(403).json({
            status: 'failed',
            error:e.message
        });
    }
    
  
}



exports.login = async (req, res, next) => {
    const { email, password } = req.body;
      try{
        if (email && password) {
            const db=admin.firestore();
            // Find User From Database
            const user = await admin.auth().getUserByEmail(email)
            console.log(user)
            const userRef = db.collection('users').doc(user?.uid);
            const doc = await userRef.get();
   
            res.status(200).json({
                status: 'success',
                data:doc?.data()
            });
      
          } 

    }catch(e){
        console.log(e)
        res.status(403).json({
            status: 'failed',
            error:e.message
        });
    }
    
  }
  
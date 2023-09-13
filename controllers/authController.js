
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
            passwordHash:signInCred.password
          }
        const data=await db.collection("users").doc(user.uid).set(userData)
        const userRef = db.collection('users').doc(user?.uid);
         const doc = await userRef.get();

         res.status(200).json({
            status: 'success',
            data:{
               id: doc?.id,
               email:doc?.data()?.email,
               username:doc?.data()?.username
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



exports.login = async (req, res, next) => {
    const { email, password } = req.body;
      try{
        if (email && password) {
            const db=admin.firestore();
            // Find User From Databas
            const user = await admin.auth().getUserByEmail(email)
            console.log(user,"userrr")
            const userRef = db.collection('users').doc(user?.uid);
            const doc = await userRef.get();
            console.log(typeof(doc?.data()?.passwordHash),typeof(password),"hash")
            console.log(await bcrypt.compare(password,doc?.data()?.passwordHash),"iiiii")
            if (!(await bcrypt.compare(password,doc?.data()?.passwordHash))) {
                throw new Error("Email or password incorrect")
                return

            }
   
            res.status(200).json({
                status: 'success',
                data:{
                   id: doc?.id,
                   email:doc?.data()?.email,
                   username:doc?.data()?.username
                  }
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
  
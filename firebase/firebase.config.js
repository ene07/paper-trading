const { initializeApp } = require('firebase-admin/app');
const admin = require("firebase-admin");

const serviceAccount = require("./service-account-firebase.json");
const firebaseConfig = {
    apiKey: "AIzaSyBPDBtRP85Ed3bmwlS8wZcHa2oGsxkDjEU",
    authDomain: "skitpay-e2101.firebaseapp.com",
    projectId: "skitpay-e2101",
    storageBucket: "skitpay-e2101.appspot.com",
    messagingSenderId: "847361465493",
    appId: "1:847361465493:web:d50c8ccea7781bafeacf9c",
    measurementId: "G-3HRXKX08NW"
  };
  

  initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://aadharcardscanner-72071.firebaseio.com",
  });


  // exports.const db=admin.firestore();
// let defaultAuth = getAuth();
// let defaultDatabase = getDatabase(defaultApp);

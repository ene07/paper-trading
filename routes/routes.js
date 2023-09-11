const express = require('express');



const {signUp,login}=require("../controllers/authController")
const {saveTrade,getPairs,getTransactions} = require('../controllers/transactionController');



const router = express.Router();

router.route('/register').post(signUp);
router.route('/login').post(login);
router.route('/transaction').post(saveTrade);
router.route('/get-pairs').get(getPairs);
router.route('/get-transactions').post(getTransactions);
// router.route('/verify').post(verify);


module.exports = router;
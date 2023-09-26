const express = require('express');



const {signUp,login}=require("../controllers/authController")
const {saveTrade,getPairs,getTransactions,leaderBoard,getUserPortfolio,getUserProfile,deposit,getCharts,getChartByContractAddress} = require('../controllers/transactionController');



const router = express.Router();

router.route('/register').post(signUp);
router.route('/login').post(login);
router.route('/transaction').post(saveTrade);
router.route('/get-pairs').get(getPairs);
router.route('/get-transactions').post(getTransactions);
router.route('/leader').get(leaderBoard);
router.route('/portfolio').post(getUserPortfolio);
router.route('/profile').post(getUserProfile);
router.route('/deposit').post(deposit);
router.route('/chart').post(getCharts);
router.route('/chart-contractaddress').post(getChartByContractAddress);
// router.route('/verify').post(verify);


module.exports = router;
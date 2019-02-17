const express = require('express');
const KMTClass = require('../lib/KMTClass');
const router = express.Router();


const KMT = new KMTClass()

/* GET users listing. */
router.route('/relay/:relay')
.get( function(req, res, next) {
   res.status(200).json({result:'KO', data: "Getting status for relay "+req.params.relay});
})
.post( function(req, res, next) {
    // res.status(200).json({result:'KO', data: MarketTrends.getMarketTrends()});
 })
 .delete( function(req, res, next) {
    // res.status(200).json({result:'KO', data: MarketTrends.getMarketTrends()});
 })


router.route('/ports')
.get( function(req, res, next) {
    KMT.listPort()
    .then(  ports => res.status(200).json({result:'success', data: ports}), 
            error => res.status(500).json({result:'failed', error: error})
    )
})


module.exports = router;

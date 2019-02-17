const express = require('express');
const KMTClass = require('../lib/KMTClass');
const router = express.Router();


const KMT = new KMTClass()

/* GET users listing. */

router.route('/relay/')
.get( function(req, res, next) {
   // Get Board Status (ENABLD or DISABLED)
})
.post( function(req, res, next) {
   // Enable Board
   KMT.enableBoard()
   .then( result => res.status(200).json(result),
           error => res.status(200).json(error))
})
.delete( function(req, res, next) {
   // Disable Board
   KMT.disableBoard()
   .then( result => res.status(200).json(result),
           error => res.status(200).json(error))
})

router.route('/relay/:relay')
.get( function(req, res, next) {
   // GET the Relay status
})
.post( function(req, res, next) {
   KMT.enableRelay(req.params.relay, req.body.TTC)
   .then( result => res.status(200).json(result),
           error => res.status(200).json(error))   
 })
 .delete( function(req, res, next) {
    KMT.disableRelay(req.params.relay)
    .then( result => res.status(200).json(result),
           error => res.status(200).json(error))    
 })


router.route('/ports')
.get( function(req, res, next) {
    KMT.listPort()
    .then(  ports => res.status(200).json({success:true, data: ports}), 
            error => res.status(500).json({success:false, error: error})
    )
})

router.route('/status')
.get( function(req, res, next) {
   // Get connection status
   res.status(200).json({success:true, data: KMT.getConnectionStatus()});
})

module.exports = router;

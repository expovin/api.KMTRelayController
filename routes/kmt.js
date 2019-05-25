const express = require('express');
const KMTClass = require('../lib/KMTClass');
const router = express.Router();
const syslog = require("syslog-client");
const os = require('os');

const KMT = new KMTClass()


var createOptions = {
    syslogHostname: os.hostname(),
    transport: syslog.Transport.Udp,
    port: "505",
    facility: 16,
    appName : "api.irrigazione",
    rfc3164 : false
};
var client = syslog.createClient("192.168.0.4", createOptions);
client.log("Avviato servizio api.irrigazione",{severity:6});

/* GET users listing. */
router.route('/reset')
.post( function(req, res, next) {
   client.log("Richiesto reset Board",{severity:5});
   // Enable Board
   KMT.resetBoard()
   .then( result => {
            client.log("Board correttamente inizializzata",{severity:6});
            res.status(200).json(result); 
          },
          error => {
            client.log("Errore inizzializzazione board: "+error,{severity:3});
            res.status(200).json(error);
          })
})


router.route('/relay')
.get( function(req, res, next) {
    client.log("Richiesto stato relay",{severity:5});
   // Get Board Status (ENABLD or DISABLED)
   res.status(200).json({success:true, isEnabled: KMT.getBoardStatus(), statusPort: KMT.getRelayStatus()});
})
.post( function(req, res, next) {
   // Enable Board
   client.log("Richiesto abilitazione Board",{severity:5});
   KMT.enableBoard()
   .then( result => {
        client.log("Board correttamente abilitata",{severity:6});
        res.status(200).json(result)
   },error => {
        client.log("Errore abilitazione board "+error,{severity:3});
        res.status(500).json(error)
   })
})
.delete( function(req, res, next) {
   // Disable Board
   client.log("Richiesto disabilitazione Board",{severity:5});
   KMT.disableBoard()
   .then( result => {
        client.log("Board correttamente disabilitata",{severity:6});
       res.status(200).json(result)
    },error => {
        client.log("Errore disabilitazione board "+error,{severity:3});
        res.status(500).json(error)
    })
})

router.route('/relay/:relay')
.get( function(req, res, next) {
   // GET the Relay status
   client.log("Richiesto stato relay "+req.params.relay,{severity:5});
   let index = parseInt(req.params.relay,10)-1;
   res.status(200).json({success:true, data: KMT.getRelayStatus()[index]});
})
.post( function(req, res, next) {
   client.log("Abilitazione relay "+req.params.relay+". TTC : "+req.body.TTC,{severity:5});
   if(req.body.callback)
    client.log("Callback : "+req.body.callback,{severity:7});
   KMT.enableRelay(req.params.relay, req.body.TTC, req.body.callback)
   .then( result => {
        client.log("Abilitazione relay avvenuta con successo",{severity:6});
        res.status(200).json(result)
    },error => {
        client.log("Errore abilitazione relay :"+error,{severity:3});
        res.status(500).json(error)
    })
 })
 .delete( function(req, res, next) {
    client.log("Disabilitazione relay "+req.params.relay,{severity:5});
    KMT.disableRelay(req.params.relay)
    .then( result => {
        client.log("Disabilitazione relay avvenuta con successo",{severity:6});
        res.status(200).json(result)
    },error => {
        client.log("Errore disabilitazione relay :"+error,{severity:3});
        res.status(500).json(error)
    })
 })


router.route('/ports')
.get( function(req, res, next) {
    client.log("Rischesta stato porte relay ",{severity:5});
    KMT.listPort()
    .then(  ports => {
        client.log("Richesta stato porte avvenuta con successo :"+ports,{severity:6});
        res.status(200).json({success:true, data: ports})
    }, error => {
        client.log("Errore richiesta stato porte relay :"+error,{severity:3});
        res.status(500).json({success:false, error: error})
    }
    )
})

module.exports = router;

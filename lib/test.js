/*
var serialport = require("serialport");

// list serial ports:
serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port);
  });
});


var myPort = new serialport("/dev/ttyACM0", 9600);


myPort.on('open', showPortOpen);
//parser.on('data', readSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);


function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.baudRate);
   console.log(myPort);
   var buffer = new Buffer.alloc(3);
   buffer[0]=0xFF;
   buffer[1]=0x01;
   buffer[2]=0x00;
   myPort.write(buffer, (error, result) =>{
     if(error) {
        console.log("Error sending data "+error);
     }

     console.log("Data sent "+result);
   });
}
 
function readSerialData(data) {
   console.log(data);
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}
*/
const KMTClass = require('./KMTClass');

const KMT = new KMTClass();
KMT.listPort();
setTimeout( ()=> {KMT.disableBoard();},2500);

setTimeout( ()=>{ KMT.enableRelay(1,25) }, 3000);
//KMT.enableRelay(1, 10);

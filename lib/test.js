var serialport = require("serialport");

// list serial ports:
serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});


var myPort = new serialport("/dev/ttyACM0", 9600);


myPort.on('open', showPortOpen);
//parser.on('data', readSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);


function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.baudRate);
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


/*
var serialPort = new SerialPort("/dev/ttyACM0", {
      baudrate: 9600
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.write("\xFF\x01\x01");
});
*/

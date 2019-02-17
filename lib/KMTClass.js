'use strict';

const serialport = require("serialport");
const settings = require("./settings");


class KMTClass  {

    constructor() {

        this.com = new serialport(settings.serialPort, settings.options, (error) =>{
            if(error) {
                console.log("Error while opening port " + error);
                throw error;
            }
            console.log(this.com.isOpen);
        });
        let Readline = serialport.parsers.Readline;
        this.parser = new Readline();
        this.com.pipe(new ByteLength({length: 8}));

        this.com.on('open', this.showPortOpen);
        this.com.on('close', this.showPortClose);
        this.com.on('error', this.showError);    
        this.parser.on('data', this.readSerialData);    
    }

    readSerialData(data) {
        console.log("Data coming from serial port");
        console.log(data);
     }

    showPortOpen(){
        console.log('port open. Data rate: ');
        console.log(this.com);
    }
    
    showPortClose(){
        console.log('port closed.');
    }
    
    showError(error){
        console.log('Error opening port : '+error);
    }    

    listPort(){
        return (serialport.list()) 
    }

    getConnectionStatus(){
        return (this.com);
    }

    getStatusPort(){
        return new Promise( (fulfill, reject) =>{
            if(this.com.isOpen){
                console.log("Getting Relay status ");
                let cmd = settings.RELAY_READ();
                console.log(cmd);
                this.com.write(cmd, (error, result) =>{
                    if(error) {
                       console.log("Error sending data "+error);
                       reject({success:false, error:error});
                    }
                    console.log("Data sent Relay. Getting state");
                    fulfill({success:true, message:"Sent message to get status"})
                });   
            }
            else {
                console.log("Port is not open");
                reject({success:false, message:"Serial port is not open"})
            }
        })        
    }

    enableBoard(){
        return new Promise( (fulfill, reject) =>{
            if(this.com.isOpen){
                console.log("Enabling KMT Board");
                let cmd = settings.RELAY_ON[7]();
                console.log(cmd);
                this.com.write(cmd, (error, result) =>{
                    if(error) {
                       console.log("Error sending data "+error);
                       reject({success:false, error:error});
                    }
                    console.log("KMT Board is enabled");
                    fulfill({success:true, message:"Relay board has been enabled"})
                });   
            }
            else{
                console.log("Port is not open");
                reject({success:false, message:"Serial port is not open"})
            }
        })
    }

    disableBoard(){
        return new Promise( (fulfill, reject) =>{
            if(this.com.isOpen){
                console.log("Disabling KMT Board");
                let cmd = settings.RELAY_OFF[7]();
                console.log(cmd);
                this.com.write(cmd, (error, result) =>{
                    if(error) {
                       console.log("Error sending data "+error);
                       reject({success:false, error:error});
                    }
                    console.log("KMT Board is disabled");
                    fulfill({success:true, message:"Relay board has been disabled"})
                }); 
            }
            else {
                console.log("Port is not open");
                reject({success:false, message:"Serial port is not open"})
            }    
        }) 
    }

    enableRelay(relay, CustomTTS=settings.TTS){
        return new Promise ( (fulfill, reject) =>{
            if(this.com.isOpen){
                console.log("Port Open, Start relay : "+relay+" for "+CustomTTS+" seconds");
                let cmd = settings.RELAY_ON[relay-1]();
                console.log(cmd);
                this.com.write(cmd, (error, result) =>{
                    if(error) {
                       console.log("Error sending data "+error);
                       reject({success:false, error:error});
                    }                    
                    console.log("Data sent Relay STARTED");
                    fulfill({success:true, message:"Relay "+relay+" has been started for "+CustomTTS+" seconds"})
                });   
                setTimeout( () =>{
                    console.log("Time Out, stop relay : "+relay); 
                    return (this.disableRelay(relay))     
                }, CustomTTS*1000 ) 
            }
            else {
                console.log("Port is not open");
                reject({success:false, message:"Serial port is not open"})
            }
        })
    }

    disableRelay(relay){
        return new Promise( (fulfill, reject) =>{
            if(this.com.isOpen){
                console.log("STOPPING Relay "+relay);
                let cmd = settings.RELAY_OFF[relay-1]();
                console.log(cmd);
                this.com.write(cmd, (error, result) =>{
                    if(error) {
                       console.log("Error sending data "+error);
                       reject({success:false, error:error});
                    }
                    console.log("Data sent Relay STOPPED");
                    fulfill({success:true, message:" Relay "+relay+" has been stopped"})
                });   
            }
            else {
                console.log("Port is not open");
                reject({success:false, message:"Serial port is not open"})
            }
        })
    }    
}

module.exports = KMTClass;

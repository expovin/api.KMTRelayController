'use strict';

const serialport = require("serialport");
const settings = require("./settings");


class KMTClass  {

    constructor() {
        this.isOpen=false;
        this.com;

        this.com = new serialport(settings.serialPort, settings.speed);
        com.on('open', this.showPortOpen);
        com.on('close', showPortClose);
        com.on('error', showError);        
    }

    showPortOpen(){
        console.log('port open. Data rate: ' + this.com.baudRate);
        this.isOpen=true;
    }
    
    showPortClose(){
        console.log('port closed.');
        this.isOpen=false;
    }
    
    showError(error){
        console.log('Error opening port : '+error);
        this.isOpen=false;
    }    

    enableBoard(){
        let cmd = settings.RELAY_ON[7]();
        this.com.write(cmd, (error, result) =>{
            if(error) {
               console.log("Error sending data "+error);
            }
            console.log("Data sent "+result);
        });        
    }

    disableBoard(){
        let cmd = settings.RELAY_OFF[7]();
        this.com.write(cmd, (error, result) =>{
            if(error) {
               console.log("Error sending data "+error);
            }
            console.log("Data sent "+result);
        });        
    }

    enableRelay(relay, CustomTTS){
        let cmd = settings.RELAY_ON[relay+1]();
        this.com.write(cmd, (error, result) =>{
            if(error) {
               console.log("Error sending data "+error);
            }
            console.log("Data sent "+result);
        });   

        setTimeout( () =>{ 
            let cmd = settings.RELAY_OFF[relay+1]();
            this.com.write(cmd, (error, result) =>{
                if(error) {
                   console.log("Error sending data "+error);
                }
                console.log("Data sent "+result);
            });               
        }, CustomTTS | settings.TTS)
    }

    disableRelay(relay){
        let cmd = settings.RELAY_OFF[relay+1]();
        this.com.write(cmd, (error, result) =>{
            if(error) {
               console.log("Error sending data "+error);
            }
            console.log("Data sent "+result);
        });   

    }    
}

module.exports = KMTClass;
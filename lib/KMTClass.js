'use strict';

const serialport = require("serialport");
const settings = require("./settings");


class KMTClass  {

    constructor() {
        this.isPortOpen=false;
        this.com;
        console.log("Serial port "+settings.serialPort+" Speed :"+settings.speed);
        this.com = new serialport(settings.serialPort, settings.speed);
        this.com.on('open', this.showPortOpen);
        this.com.on('close', this.showPortClose);
        this.com.on('error', this.showError);        
    }

    showPortOpen(){
        console.log('port open. Data rate: ');
        console.log(this.com);
        this.isPortOpen=true;
    }
    
    showPortClose(){
        console.log('port closed.');
        this.isPortOpen=false;
    }
    
    showError(error){
        console.log('Error opening port : '+error);
        this.isPortOpen=false;
    }    

    enableBoard(){
        if(this.isPortOpen){
            let cmd = settings.RELAY_ON[7]();
            this.com.write(cmd, (error, result) =>{
                if(error) {
                   console.log("Error sending data "+error);
                }
                console.log("Data sent "+result);
            });   
        }
        else
            console.log("Port is not open");
     
    }

    disableBoard(){
        if(this.isPortOpen){
            let cmd = settings.RELAY_OFF[7]();
            this.com.write(cmd, (error, result) =>{
                if(error) {
                   console.log("Error sending data "+error);
                }
                console.log("Data sent "+result);
            }); 
        }
        else 
           console.log("Port is not open")
       
    }

    enableRelay(relay, CustomTTS){
        if(this.isPortOpen){
            console.log("Port Open, Start relay : "+relay);
            let cmd = settings.RELAY_ON[relay+1]();
            this.com.write(cmd, (error, result) =>{
                if(error) {
                   console.log("Error sending data "+error);
                }
                console.log("Data sent "+result);
            });   
    
            setTimeout( () =>{
                console.log("Time Out, stop relay : "+relay); 
                let cmd = settings.RELAY_OFF[relay+1]();
                this.com.write(cmd, (error, result) =>{
                    if(error) {
                       console.log("Error sending data "+error);
                    }
                    console.log("Data sent "+result);
                });               
            }, CustomTTS | settings.TTS)
        }
        else
           console.log("Port is not open");

    }

    disableRelay(relay){
        if(this.isPortOpen){
            let cmd = settings.RELAY_OFF[relay+1]();
            this.com.write(cmd, (error, result) =>{
                if(error) {
                   console.log("Error sending data "+error);
                }
                console.log("Data sent "+result);
            });   
        }
        else
            console.log("Port is not")


    }    
}

module.exports = KMTClass;

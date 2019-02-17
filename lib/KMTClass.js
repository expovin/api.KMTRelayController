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
        this.com.on('open', this.showPortOpen);
        this.com.on('close', this.showPortClose);
        this.com.on('error', this.showError);        
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
        return serialport.list 
        /*()
        .then( ports => {
            console.log(ports);
            return (ports)
        },
               error => {
                   console.log(error);
                   throw error;
                })
                */
    }

    enableBoard(){
        if(this.com.isOpen){
            console.log("Enabling KMT Board");
            let cmd = settings.RELAY_ON[7]();
            console.log(cmd);
            this.com.write(cmd, (error, result) =>{
                if(error) {
                   console.log("Error sending data "+error);
                }
                console.log("KMT Board is enabled");
            });   
        }
        else
            console.log("Port is not open");
     
    }

    disableBoard(){
        if(this.com.isOpen){
            console.log("Disabling KMT Board");
            let cmd = settings.RELAY_OFF[7]();
            console.log(cmd);
            this.com.write(cmd, (error, result) =>{
                if(error) {
                   console.log("Error sending data "+error);
                }
                console.log("KMT Board is disabled");
            }); 
        }
        else 
           console.log("Port is not open")
       
    }

    enableRelay(relay, CustomTTS=settings.TTS){
        if(this.com.isOpen){
            console.log("Port Open, Start relay : "+relay+" for "+CustomTTS+" seconds");
            let cmd = settings.RELAY_ON[relay-1]();
            console.log(cmd);
            this.com.write(cmd, (error, result) =>{
                if(error) {
                   console.log("Error sending data "+error);
                }
                console.log("Data sent Relay STARTED");
            });   
            setTimeout( () =>{
                console.log("Time Out, stop relay : "+relay); 
                this.disableRelay(relay);       
            }, CustomTTS*1000 ) 
        }
        else
           console.log("Port is not open");

    }

    disableRelay(relay){
        if(this.com.isOpen){
            console.log("STOPPING Relay "+relay);
            let cmd = settings.RELAY_OFF[relay-1]();
            console.log(cmd);
            this.com.write(cmd, (error, result) =>{
                if(error) {
                   console.log("Error sending data "+error);
                }
                console.log("Data sent Relay STOPPED");
            });   
        }
        else
            console.log("Port is not")


    }    
}

module.exports = KMTClass;

const { exec } = require('child_process');


const enableBoard = "\xFF\x08\x01"
const disableBoard = "\xFF\x08\x01"
const enableArea = ["\xFF\x01\x01", "\xFF\x02\x01", "\xFF\x03\x01", "\xFF\x04\x01", "\xFF\x05\x01", "\xFF\x06\x01", "\xFF\x07\x01"]
const disableArea= ["\xFF\x01\x00", "\xFF\x02\x00", "\xFF\x03\x00", "\xFF\x04\x00", "\xFF\x05\x00", "\xFF\x06\x00", "\xFF\x07\x00"]

const cmdModel = "echo -e <{placeholder}> > /dev/ACM0";

module.exports = {

    enableBoard : function() {
        var cmd = cmdModel.replace("<{placeholder}>",enableBoard);
        console.log("Comando --> "+cmd);
        return new Promise( (fulfill, reject) =>{
            exec(cmd, (err, stdout, stderr) =>{
                if(err) reject(err);
                fulfill(stdout);
            })
        })
    },

    disableBoard : function() {
        var cmd = cmdModel.replace("<{placeholder}>",disableBoard);
        console.log("Comando --> "+cmd);
        return new Promise( (fulfill, reject) =>{
            exec(cmd, (err, stdout, stderr) =>{
                if(err) reject(err);
                fulfill(stdout);
            })
        })
    },


    enableArea: function(area){
        var cmd = cmdModel.replace("<{placeholder}>",enableArea[area]);
        return new Promise( (fulfill, reject) =>{
            exec(cmd, (err, stdout, stderr) =>{
                if(err) reject(err);
                fulfill(stdout);
            })
        })
    },

    
    disableArea: function(area){
        var cmd = cmdModel.replace("<{placeholder}>",disableArea[area]);
        return new Promise( (fulfill, reject) =>{
            exec(cmd, (err, stdout, stderr) =>{
                if(err) reject(err);
                fulfill(stdout);
            })
        })
    }


}

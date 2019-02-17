const { exec } = require('child_process');




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

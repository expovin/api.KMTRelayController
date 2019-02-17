var buffer = new Buffer.alloc(3);
buffer[0]=0xFF;

module.exports = {

    serialPort : "/dev/ttyACM0",            // Serial port to open
    speed : 9600,                           // Serial port communication speed
    TTS : 5 * 60,                           // Default time to stop in seconds

    RELAY_ON: [
        function () {
            buffer[1]=0x01;
            buffer[2]=0x01;
            return (buffer)
        },   
    
        function () {
            buffer[1]=0x02;
            buffer[2]=0x01;
            return (buffer)
        },     
        
        function () {
            buffer[1]=0x03;
            buffer[2]=0x01;
            return (buffer)
        },     
    
        function () {
            buffer[1]=0x04;
            buffer[2]=0x01;
            return (buffer)
        },  
    
        function () {
            buffer[1]=0x05;
            buffer[2]=0x01;
            return (buffer)
        }, 
    
        function () {
            buffer[1]=0x06;
            buffer[2]=0x01;
            return (buffer)
        },   
    
        function () {
            buffer[1]=0x07;
            buffer[2]=0x01;
            return (buffer)
        },   
    
        function () {
            buffer[1]=0x08;
            buffer[2]=0x01;
            return (buffer)
        }
    ],

    RELAY_OFF : [
        function () {
            buffer[1]=0x01;
            buffer[2]=0x00;
            return (buffer)
        },             

        function () {
            buffer[1]=0x02;
            buffer[2]=0x00;
            return (buffer)
        },      
        
        function () {
            buffer[1]=0x03;
            buffer[2]=0x00;
            return (buffer)
        },       
        
        function () {
            buffer[1]=0x04;
            buffer[2]=0x00;
            return (buffer)
        },   
        
        function () {
            buffer[1]=0x05;
            buffer[2]=0x00;
            return (buffer)
        },          

        function () {
            buffer[1]=0x06;
            buffer[2]=0x00;
            return (buffer)
        },       
        
        function () {
            buffer[1]=0x07;
            buffer[2]=0x00;
            return (buffer)
        },     
        
        function () {
            buffer[1]=0x08;
            buffer[2]=0x00;
            return (buffer)
        }        
    ]    

}
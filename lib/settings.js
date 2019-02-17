var buffer = new Buffer.alloc(3);
buffer[0]=0xFF;

module.exports = {

    serialPort : "/dev/ttyACM0",            // Serial port to open
    options : {
        autoOpen : true,                    // Automatically opens the port on `nextTick`.
        baudRate : 9600,                    // The baud rate of the port to be opened. This should match one of the 
                                            // commonly available baud rates, such as 110, 300, 1200, 2400, 4800, 9600, 14400, 19200, 
                                            // 38400, 57600, or 115200. Custom rates are supported best effort per platform. 
                                            // The device connected to the serial port is not guaranteed to support the requested baud rate, 
                                            // even if the port itself supports that baud rate.
        dataBits : 8,                       // Must be one of these: 8, 7, 6, or 5.
        highWaterMark : 65536,              // The size of the read and write buffers defaults to 64k.
        lock : true,                        // Prevent other processes from opening the port. Windows does not currently support `false`.
        stopBits : 1,                       // Must be one of these: 1 or 2.
//        parity : none,                      // Must be one of these: 'none', 'even', 'mark', 'odd', 'space'.
        rtscts :false,                      // flow control setting
        xon : false,                        // flow control setting
        xoff : false,                       // flow control setting
        xany : false                        // flow control setting

            /**
             * 
             *  object= bindingOptions sets binding-specific options
             *  Binding= Binding The hardware access binding. Bindings are how Node-Serialport talks to the underlying system. Will default to the static property `Serialport.Binding`.
             *  number [bindingOptions.vmin=1] see [man termios](http://linux.die.net/man/3/termios) LinuxBinding and DarwinBinding
             *  {number} [bindingOptions.vtime=0] see [man termios](http://linux.die.net/man/3/termios) LinuxBinding and DarwinBinding
             */
    },
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

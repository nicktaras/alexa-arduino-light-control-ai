var SerialPort = require('serialport');
var port = new SerialPort('/dev/tty-usbserial1'); 

// TODO's 
// - find serial of board

const serialHandlder = (msg) => {

  port.write(msg, function(err) {

    if (err) {
      return console.log('Error on write: ', err.message);
    }

    console.log('Success: message written');

  }, 'error', function(err) {

    console.log('Error: ', err.message);

  });
}

module.exports = serialHandlder;

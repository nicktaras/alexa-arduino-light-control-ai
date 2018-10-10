var appConstants = require('./appConstants');
var SerialPort = require('serialport');
var port = new SerialPort(appConstants.arduinoSerialPort); 

const ledHandler = (msg) => {

  port.write(msg, function(err) {

    if (err) {
      return console.log('Error on write: ', err.message);
    }

    console.log('Success: message written');

  }, 'error', function(err) {

    console.log('Error: ', err.message);

  });
}

module.exports = ledHandler;

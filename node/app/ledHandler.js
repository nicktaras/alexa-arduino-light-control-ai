var appConstants = require('./appConstants');
var SerialPort = require('serialport');
var port = new SerialPort(appConstants.arduinoSerialPort); 

// Convert input to readable output
const ledStateTransformed = (state) => {
  return state === 'on' ? '1' : '0';
}

// ledHandler sends the updated state 
// to the arduino via the serial port.
const ledHandler = (state) => {
  /*
    {
      "light": String ("on" / "off")
    }
  */
  port.write(ledStateTransformed(state), function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('Success: message written');
  }, 'error', function(err) {
    console.log('Error: ', err.message);
  });
}

module.exports = ledHandler;

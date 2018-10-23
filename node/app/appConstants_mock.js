// Make a copy of this file called appConstants
// then add your custom data specific to your app
// The 'appConstants.js' has been added to gitignore so it wont 
// be sent to github with any security vulnerable credentials you include there.

// databaseEndPoint: where alexa's output to a db can be found.
// arduinoSerialPort: the usb port the arduino is plugged into.

// To obtain a list of serial connections, run: ls /dev/tty.*

const appConstants = {
  databaseEndPoint: 'add end point here',
  arduinoSerialPort: '/dev/cu.usbmodem0000',
  arduinoBluetooth: '/dev/tty.HC-06-DevB'
}

module.exports = appConstants;
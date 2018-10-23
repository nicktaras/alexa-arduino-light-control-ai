// Node's https module
const https = require('https');

// Extract variables from appConstants
const { databaseEndPoint } = require('./appConstants');

// Sends led data to serial (USB or Bluetooth)
const ledHandler = require('./ledHandler');

// Listens to AWS Endpoint
const server = require('http').createServer();

// Get state from database
const getCurrentStateData = () => {
  https.get(databaseEndPoint, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        appUpdate(JSON.parse(data));
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

// Sends data to Arduino via ledHandler()
// Initialises the next timeout for polling the server for changes.
const appUpdate = (data) => {
  /*
    data: {
      light: 'String'
    }
  */
  let pollDelay = 2000;
  setTimeout(getCurrentStateData, pollDelay);
  if (!data) return;

  // if connectecting to Arduino via serial port
  ledHandler(data.light)

}

server.listen(3000, function () { 
  console.log('listening on 3000'); 
  appUpdate();
});

// ------------ //
// For Dev use: //
// ------------ //
 
// A test method to ensure for the Arduino
// To toggle the data sent from 0 to 1
// const appUpdateMock = () => {
//   if(out === 'OFF') out = 'ON';
//   else if(out === 'ON') out = 'OFF';
//   appUpdate(out);
// }
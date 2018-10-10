const http = require('http'); // const https = require('https');

// TODO's 
// - use https with AWS end point.

// Simple use of Socket IO - Web Server Only.
const io = require('socket.io')({ serveClient: false });

// Handles data to serial event
const serialHandler = require('serialHandler');

// Extract variables from appConstants
const { databaseEndPoint } = require('appConstants');

// Listens to AWS Endpoint
const server = require('http').createServer();

const getData = () => {
  setTimeout(function () {
  http.get(databaseEndPoint, (resp) => {
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
  });
};

const appUpdate = (data) => {
  /*
    data: { 
      state: {
        light: boolean
      }
    }
  */
  // Trigger in a cycle - polling database for changes.
  let pollDelay = 3000;
  setTimeout(getData, pollDelay);
  if (!data) return;
  serialHandler(data);
}

appUpdate();

server.listen(3000, function () { console.log('listening on 3000'); });
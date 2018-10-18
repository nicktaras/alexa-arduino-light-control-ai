//
// led_test
// This is a proof of concept application / boiler plate to build
// an IOT application.
// For more information please visit: https://github.com/nicktaras/alexa-arduino-light-control-ai
//

'use strict';

const Alexa = require('alexa-sdk');
const AWS = require('aws-sdk');
const APP_ID = "ADD_ALEXA_ID_HERE";

const handlers = {
  'LaunchRequest': function () {
    this.emit(':ask', "Welcome to the LED Test Skill.");
  },
  'AMAZON.FallbackIntent': function () {
    this.emit(':ask', "Something went wrong, try again.");
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':ask', "Cancelled action.");
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':ask', "Try saying, turn the light on. Or, hit the lights off.");
  },
  'AMAZON.StopIntent': function () {
    this.emit(':ask', "Stopped action."); 
  },
  'AMAZON.NavigateHomeIntent': function () {
    this.emit(':ask', "Navigating home now.");
  },
  'light_intent': function () {

    // doc client AWS API
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    // Read from JSON user request data
    let slotValue = this.event.request.intent.slots.switch.value || 'off';

    // UpdateExpression (method field operator :tempVariable)
    // ExpressionAttributeValues (assign value to db field)
    var params = {
        TableName: "Device_DB",
        Key:{
            "instance": 0
        },
        UpdateExpression: "set light = :lightValue",
        ExpressionAttributeValues:{
            ":lightValue" : slotValue
        },
        ReturnValues:"UPDATED_NEW"
    };

    // Post data to database
    docClient.update(params, ((err, data) => {
      if (err) {
        this.emit(':ask', 'Sorry the request failed. Please try again');  
      } else {
        this.emit(':ask', 'Switching the light ' + slotValue);  
      }
    }));
  }
}; 

exports.handler = function (event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
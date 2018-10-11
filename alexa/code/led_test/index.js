//
// led_test
// This is a proof of concept application / boiler plate to build
// an IOT application.
// For more infromation please visit: https://github.com/nicktaras/alexa-arduino-light-control-ai
//

'use strict';

const Alexa = require('alexa-sdk');
const AWS = require('aws-sdk');
const APP_ID = undefined;

const handlers = {
  'LaunchRequest': function () {
    this.emit(':ask', "Welcome");
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

    var docClient = new AWS.DynamoDB.DocumentClient();
    let slotValue = this.event.request.intent.slots.switch.value || 'off';
    
    // state is the primary key
    // 0 is the entry position.
    
    // switch is the slot
    // slot value is the value to assign
    
    var params = {
        TableName: "LedDb",
        Key:{
            "state": 0
        },
        UpdateExpression: "set switch = :switchState",
        ExpressionAttributeValues: {
            ":switchState" : slotValue
        }
    };

    docClient.update(params, (() => {
      this.emit(':ask', 'Switching the light ' + slotValue);  
    }));
      
  }
}; 

exports.handler = function (event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
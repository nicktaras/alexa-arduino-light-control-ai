'use strict';
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: "LedDb",
    Key:{
        "state": 0
    }
};

// GET request to retrieve the application state
// for the light switch.
exports.handler = (event, context, callback) => {
    docClient.get(params, function(err, data) {
        if (err) {
            return console.error("that didn't work", data);
        }
        var payload = JSON.stringify(data, null, 2);
        var obj = JSON.parse(payload);
        var state = obj.Item.switch;
        callback(null, { state: state });
    });
};
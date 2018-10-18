'use strict';

var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

// TableName (Database name)
// Key (Primary key and index value)
var params = {
    TableName: "Device_DB", 
    Key: {
        "instance": 0
    }
};

// GET request to retrieve the application state
exports.handler = (event, context, callback) => {
    docClient.get(params, function(err, data) {
        if (err) {
            return console.error("that didn't work", data);
        }
        var payload = JSON.stringify(data, null, 2);
        var obj = JSON.parse(payload);
        var state = obj.Item; 
        delete state.instance; // Send payload without instance id.
        callback(null, state);
    });
};
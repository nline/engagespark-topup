var request = require('request');
var debug = require('debug')('engagespark-topup');

var engagespark = function(organizationID, APIKey) {
    this.orgID = organizationID;
    this.APIKey = APIKey; 
};

engagespark.prototype.send_topup = function(phoneNumber, amount, clientRef, callback) {
    
    var body = {
        organizationId: this.orgID,
        maxAmount: amount,
        phoneNumber: phoneNumber,
        clientRef: clientRef
    };

    var headers = {
        "authorization": 'Token ' + this.APIKey,
        "content-type": 'application/json'
    };

    request({
        uri: 'https://api.engagespark.com/v1/airtime-topup/',
        method: 'POST',
        headers: headers,
        json: true,
        body: body
    }, function(error, response, body) {
        debug(error);
        debug(response);
        debug(body);
        callback(error, response, body);
    });
};

module.exports = engagespark;

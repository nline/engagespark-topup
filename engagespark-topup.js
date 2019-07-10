var request = require('request');
var debug = require('debug')('engagespark-topup');

var engagespark = function(organizationID, APIKey) {
    this.orgID = organizationID;
    this.APIKey = APIKey; 
    debug("Engagespark Initialized with orgID", this.orgID, "and APIKey", this.APIKey);
};

engagespark.prototype.send_topup = function(phoneNumber, amount, clientRef, callback) {
    
    var body = {
        organizationId: String(this.orgID),
        maxAmount: String(amount),
        phoneNumber: String(phoneNumber),
        clientRef: String(clientRef)
    };

    var headers = {
        "authorization": 'Token ' + this.APIKey,
        "content-type": 'application/json'
    };

    request({
        uri: 'https://api.engagespark.com/v1/airtime-topup',
        method: 'POST',
        headers: headers,
        json: true,
        body: body
    }, function(error, response, body) {
        debug(error);
        debug(body);
        if(error) {
            callback(error, response, body);
        } else if(typeof body == 'undefined') {
            callback('Undefined response body', response, body);
        } else if(!('status' in body)) {
            callback('No status in response body', response, body);
        } else if(typeof body != 'undefined' && ('status' in body) && body.status != 'Success') {
            callback('Transaction status not success', response, body);
        } else {
            callback(error, response, body);
        }
    });
};

module.exports = engagespark;

#!/usr/bin/env node

var engagespark = require('./engagespark-topup.js');

var command = require('commander');
command.option('-a, --apikey [apikey]', 'EngageSpark API Key');
command.option('-i, --orgID [orgID]', 'EngageSpark org ID');
command.option('-p, --phoneNumber [phoneNumber]', 'phone number');
command.option('-n, --amount [amount]', 'max amount of money to transfer').parse(process.argv);

topup = new engagespark(command.orgID, command.apikey);
topup.send_topup(command.phoneNumber, command.amount, null, function(error, response, body) {
    if(error) {
        console.log("Error:",error);
    } else {
        console.log(body.status,' - ',body.errorMessage);
        if(body.status == 'Success') {
            console.log('Amount sent:', body.amountSent);
            console.log('Deducted from account:', body.price);
        }
    }
});

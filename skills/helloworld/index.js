// straight from http:/github.com/alexa/skill-sample-nodejs-hello-world Amazon example
// should work out of the box - follow amazon guide for setting up this example
// but use https://<yourdomainname>/alexa/helloworld as the https endpoint


'use strict';
var Alexa = require("alexa-sdk");

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        this.emit('SayHello')
    },
    'SayHello': function () {
        this.emit(':tell', 'Hello World!');
    }
};
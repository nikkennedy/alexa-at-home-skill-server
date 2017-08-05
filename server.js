'use strict';

var config     = require('./config');
var express    = require('express');
var https      = require('https');
var fs         = require('fs');
var bodyParser = require('body-parser');
var context    = require('aws-lambda-mock-context');
var request    = require('request');

const serverPort = config.alexaAtHomeServer.internalPort;
const serverIP   = config.alexaAtHomeServer.internalIP;

// SSL Certificate - highly recommend using a free (yes free) letsencrypt.org ssl certificate
var privateKey  = fs.readFileSync("./sslcert/privkey.pem", 'utf8');
var certificate = fs.readFileSync("./sslcert/fullchain.pem", 'utf8');
var credentials = {key: privateKey, cert: certificate};

const app = express();
app.use(bodyParser.json({ type: 'application/json' }));

// https://<externalURL>/alexa/<skillName> is where you point your skill 
// place skill inside /skills directory with 
app.post('/alexa/*', function (req, res) {

    var ctx = context();

    var splitPath = req.url.split('/');
    var skillName = splitPath[2];

    if(skillName.length != 0) {
        try {
            var lambdaFunc = require('./skills/' + skillName);
            lambdaFunc.handler(req.body,ctx);
            ctx.Promise
                .then(resp => {  return res.status(200).json(resp); })
                .catch(err => {  console.log(err); })
        } catch (e){
            console.log("ERROR: skill " + skillName + " does not exist");
            res.send("Skill " + skillName + " not available");
            ctx.done(null, 0);
        }

    } else {
        console.log("ERROR: no skill name was requested");
        res.send("no skill requested");
        ctx.done(null, 0);
    }

});

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(serverPort, serverIP, function () {
    console.log('Alexa at Home HTTPS Server: ' + serverIP + ':' + serverPort);
});






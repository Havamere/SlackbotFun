    var Slack = require('slack-node');
var express = require('express');
var url = require('url');
var http = require("http");
var app = express();


////////////// THE SETUP ///////////////////////////////////////////

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'))

app.get('/', function(request, response) {

    var urlObject = url.parse(request.url,true).query
    console.log(urlObject)
    sendMessage(urlObject);
    funnyResponse(urlObject);

}); //app.get


/////////////// THE SEND MESSAGE //////////////////////////////////////////

function sendMessage(urlObject){

    slack = new Slack();
    slack.setWebhook(urlObject.response_url);

    //   /mySlashCommand catfish    'catfish' is stored in var userCommand
    var userText = urlObject.text;

    slack.webhook({
     channel: urlObject.channel_name,

      text: "I see that you typed: " + userText                  // the response back to slack

    }, function(err, response) {
        if (err){
            console.log(err)
        }
    });
}

/////////////////////////////////////////////////////////

//////////////////// Respond to message /////////////////

function funnyResponse(urlObject) {
    slack = new Slack();
    slack.setWebhook(urlObject.response_url);

    //http.get()
    console.log("Hi there, I'm a console log!");
    //new slash command
    var userText = urlObject.text;

    slack.webhook({
        channel: urlObject.channel_name,

        text: "Your mom likes " + userText

    } , function(err, response) {
        if (err) {
            console.log(err)
        }
    });
}
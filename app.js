    var Slack = require('slack-node');
var express = require('express');
var url = require('url');
var request = require("request");
var app = express();


// Credentials for Flickr API.
var credentials = {
    key: "03a3596a934e192f8d95f41bb5bc1684",
    secret: "1158b7c4ac3fa826"
}

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

    //new slash command
    var userText = urlObject.text;

    request("https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key="+credentials.key
        +"&format=json&per_page=1&safe_search=1&tags="+userText, function(error, response, body) {

            var pic = JSON.parse(response.slice(14, response.length - 1);

            console.log(pic);
        }
    //console.log("Hi there, I'm a console log!");



    slack.webhook({
        channel: urlObject.channel_name,

        text: "Your mom likes " + userText

    } , function(err, response) {
        if (err) {
            console.log(err)
        }
    });
}
var Botkit = require('botkit');
var builder = require('botbuilder');

var controller = Botkit.slackbot({
    debug: true
});

var bot = controller.spawn({
    token: process.env.token
});

var slackBot = new builder.SlackBot(controller, bot);
slackBot.add('/', function (session) {
    session.send('Hello World');
});

slackBot.listenForMentions();

bot.startRTM(function(err,bot,payload) {
    if (err) {
        throw new Error('Could not connect to Slack');
    }
});

// var Botkit = require('botkit');
// var controller = Botkit.slackbot();
//
// var bot = controller.spawn({
//     token: process.env.token
// });
//
// bot.startRTM(function(err,bot,payload) {
//     if (err) {
//         throw new Error('Could not connect to Slack');
//     }
// });
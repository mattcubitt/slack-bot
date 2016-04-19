var Botkit = require('botkit');
var moment = require('moment');

var controller = Botkit.slackbot({
    debug: true
});

function onStart(err,bot,payload) {
    if (err) {
        throw new Error('Could not connect to Slack');
    }
}

var bot = controller.spawn({
    token: process.env.token
}).startRTM(onStart);

controller.hears(['platform', 'support'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    var today = new moment();
    var platformSupportUser;

    if(today >= new moment('2016-04-18 00:00:01') && today < new moment('2016-04-22 23:59:59')) {
        platformSupportUser = '@philhack';
    } else if(today >= new moment('2016-04-25 00:00:01') && today < new moment('2016-04-29 23:59:59')) {
        platformSupportUser = '@andy';
    } else if(today >= new moment('2016-05-02 00:00:01') && today < new moment('2016-05-06 23:59:59')) {
        platformSupportUser = '@jasond_s';
    }

    bot.reply(message,`${platformSupportUser} is on platform support today.`);
});

var request = require('request');

controller.hears(['interesting', 'fact'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    request(`http://numbersapi.com/random/trivia`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            bot.reply(message, body);
        }
    });
});

controller.hears(['new', 'traders'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    bot.reply(message, 'There are 30 new traders this month.');
});

controller.hears(['you', 'know'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    var knowledgeList = `
        Here\'s a list of things i know:
        - Who is on platform support this week
        - How many new trades there are this month
        - Some interesting facts
            
        Soon i'll be able to:
        - Integrate with looker in realtime
        - Submit platform support ticket to zendesk
            
        Tell me if you think i'm missing something but remember to say please.
    `;

    bot.reply(message, knowledgeList);
});

controller.hears(['learn', 'how'], ['direct_message', 'direct_mention', 'mention'], function(bot, message) {
    bot.startPrivateConversation({user: 'U04ACR0MT'},function(err,convo) {
        if (err) {
            console.log(err);
        } else {
            convo.say('new feature request: ' + message.text);
        }
    });

    bot.reply(message, 'Thanks for the feedback!');
});

var cleverbot = require("cleverbot.io"),
    cleverbot = new cleverbot('TjYIV976kAtGafcp', 'cKzpR3zaTdZ9dJByds8aB1PpgvxPtb6P');

cleverbot.setNick("platform-bot");
cleverbot.create(function (err, session) {
    if (err) {
        console.log('cleverbot create fail.');
    } else {
        console.log('cleverbot create success.');
    }
});

controller.hears('','direct_message,direct_mention,mention',function(bot,message) {
    var msg = message.text;
    cleverbot.ask(msg, function (err, response) {
        if (!err) {
            bot.reply(message, response);
        } else {
            console.log('cleverbot err: ' + err);
        }
    });
});
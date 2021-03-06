var Discord = require('discord.io');
var logger = require('winston');
var auth = require('../auth.json');
var commands = require('../data/commands.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

// These functions need to be in bot.js as they always need to run

export bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

export bot.on('readMessage', function (user, userID, channelID, message, evt) {
    /* Bot will listen to all messages and act on ones that
       begin with '*' */
    if (message.substring(0, 1) == '*') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var display = "";
        // TODO: separate into new file
        args = args.splice(1);
        switch(cmd) {
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            case 'help':
              // TODO: find better way to do this
              display = commands[1].message
              bot.sendMessage({
                to: channelID,
                message: display
              });
            default:
              display = commands[0].message
              bot.sendMessage({
                to: channelID,
                message: display
              });
         }
     }
});

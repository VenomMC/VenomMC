module.exports.run = (client, message, args) => {
  return message.channel.send(`The bot has been online for: **${client.functions.formatTime(client.uptime)}**`);
};

module.exports.help = {
  desc: 'Outputs the uptime of the bot.',
  usage: 'uptime'
};

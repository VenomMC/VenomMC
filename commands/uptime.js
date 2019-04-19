module.exports.run = (client, message, args) => {
  const seconds = Math.floor((client.uptime / 1000) % 60);
  const minutes = Math.floor((client.uptime / 1000 / 60) % 60);
  const hours = Math.floor((client.uptime / 1000 / 60 / 60) % 24);
  const days = Math.floor(client.uptime / 1000 / 60 / 60 / 24);

  return message.channel.send(`The bot has been online for: **${days}** Days, **${hours}** Hours, **${minutes}** Minutes, and **${seconds}** Seconds.`);
};

module.exports.help = {
  desc: 'Outputs the uptime of the bot.',
  usage: 'uptime'
};

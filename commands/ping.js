module.exports.run = async (client, message, args) => {
  return message.channel.send(`Pong! :heartbeat: \`${Math.round(client.ws.ping)}ms\``);
};

module.exports.help = {
  desc: 'Outputs the ping of the bot.',
  usage: 'ping'
};

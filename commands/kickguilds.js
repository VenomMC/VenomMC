module.exports.run = (client, message, args) => {
  if (!client.config.owners.includes(message.author.id)) return message.reply(':x: Only the bot owners may use this command.');
  if (!client.guilds.some(g => g.id !== client.config.officialserver)) return message.reply(':x: I am not in any other guild than the official one.');

  const guilds = client.guilds.filter(g => g.id !== client.config.officialserver);
  guilds.forEach(g => g.leave());
  return message.channel.send('Successfully left from every unofficial VenomMC server.');
};

module.exports.help = {
  desc: 'Kicks the bot from servers that are unofficial.',
  usage: 'kickguilds'
};

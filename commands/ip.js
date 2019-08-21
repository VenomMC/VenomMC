module.exports.run = (client, message, args) => {
  if (!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.reply(':x: I do not have the required permission `Embed Links` in this channel.');

  const embed = new client.Discord.MessageEmbed()
    .setTitle('IP to join VenomMC')
    .setDescription(client.config.ip)
    .setColor(0x00FF00);
  return message.channel.send(embed);
};

module.exports.help = {
  desc: 'Displays the IP of the server.',
  usage: 'ip',
  venom: true
};

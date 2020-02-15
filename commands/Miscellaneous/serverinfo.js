const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
  if (!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.reply(':x: I do not have the required permission `Embed Links` in this channel.');
  const body = await fetch('https://mcapi.us/server/status?ip=74.121.190.202&port=25583').then(res => res.json());
  if (body.status !== 'success') return message.reply(':x: Cannot retrieve server information at the time. Issue reoccurring? Contact Spiget.');

  const embed = new client.Discord.MessageEmbed()
    .setTitle('Server Information')
    .addField('Total Members Online', body.online ? body.players.now : 'N/A')
    .addField('Server Status', body.online ? 'Online' : 'Offline')
    .setColor(body.online ? 0x00FF00 : 0xFF0000)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

  return message.channel.send(embed);
};

module.exports.help = {
  category: 'Miscellaneous',
  desc: 'Displays the information about the Minecraft server.',
  usage: 'serverinfo'
};

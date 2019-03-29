const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
  if (!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.reply(':x: I do not have the required permission `Embed Links` in this channel.');
  const body = await fetch('https://mcapi.us/server/status?ip=play.venommc.net').then(res => res.json());
  if (body.status !== 'success' || !body.online) return message.reply(':x: Cannot retrieve server information at the time. Issue reoccurring? Contact Spiget.');

  const embed = new client.Discord.MessageEmbed()
    .setTitle('Server Information')
    .addField('Total Members Online', body.players.now)
    .setColor(0x00FF00)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

  return message.channel.send(embed);
};

module.exports.help = {
  desc: 'Displays the information about the Minecraft server.',
  usage: 'serverinfo'
};

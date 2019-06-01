module.exports.run = async (client, message, args) => {
  const music = client.functions.get('music');
  if (!music.playing || music.queue.length === 0) return message.reply(':x: I am not playing anything.');
  if (!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.reply(':x: I do not have the required permission `Embed Links` in this channel.');

  const songs = music.queue.map((vid, i) => `${i + 1}. ${client.escMD(vid.title)}`).join('\n');
  const embed = new client.Discord.MessageEmbed()
    .setTitle('Queue')
    .setDescription(songs)
    .setColor(0x00FF00)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

  return message.channel.send(embed);
};

module.exports.help = {
  desc: 'Displays the queue.',
  usage: 'queue'
};

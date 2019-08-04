module.exports.run = (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(':x: You do not have the required permission `Manage Server`!');
  const channel = message.guild.channels.find(chan => chan.type === 'text' && chan.name === 'announcements');
  if (!channel) return message.reply('I did not find the announcements channel.');
  if (!channel.permissionsFor(client.user).has([ 'VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS' ])) return message.reply('I am missing permissions in the announcements channel. Please make sure I have the following permissions.\n\n`View Channel\nSend Messages\nEmbed Links`');

  if (!args[1]) return message.reply('You have to provide content for me to announce!');
  const content = args.slice(1).join(' ');

  const embed = new client.Discord.MessageEmbed()
    .setTitle('New Announcement')
    .setFooter(`Sent by ${message.member.displayName}`, message.author.displayAvatarURL())
    .setDescription(content)
    .setColor(0x00FF00)
    .setTimestamp();

  channel.send(embed);
  return message.channel.send('Successfully announced something to the announcements channel.');
};

module.exports.help = {
  desc: 'Announces something to #announcements.',
  usage: 'announce <Content>'
};

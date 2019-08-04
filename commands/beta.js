module.exports.run = (client, message, args) => {
  const role = message.guild.roles.find(r => r.name === 'Beta Tester');
  if (!role) return message.reply(':x: I did not find the `Beta Tester` role.');
  if (!message.member.roles.has(role.id)) return message.reply(':x: You required the `Beta Tester` role to execute this command.');

  if (!args[1]) return message.reply(':x: You must provide something to suggest.');
  const info = args.slice(1).join(' ');

  const channel = message.guild.channels.find(c => c.type === 'text' && c.name === 'beta-tester-bug-reports');
  if (!channel) return message.reply(':x: I did not find the `beta-tester-bug-reports` channel!');
  if (!channel.permissionsFor(client.user).has([ 'VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS' ])) return message.reply(':x: I do not have permissions in the beta bug reports channel.');
  const embed = new client.Discord.MessageEmbed()
    .setTitle('New Beta Suggestion / Bug Reported')
    .setDescription(info)
    .setColor(0x00FF00)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

  message.channel.send('Successfully suggested / reported something to the beta bug channel.');
  return channel.send(embed);
};

module.exports.help = {
  desc: 'Reports / Suggests something to the bug-tester channel.',
  usage: 'beta <Suggestion/Bug>'
};

module.exports.run = message => {
  if (message.channel.name !== 'staff-loa') return;
  if (!message.channel.permissionsFor(message.guild.me).has(['VIEW_CHANNEL', 'SEND_MESSAGES'])) return;
  if (!message.content.includes('Reason: ') || message.content.includes('Reason: I don\'t have time')) return;

  message.guild.channels.find('management-loa-logs').send(message.content);
  return message.reply('Accepted :white_check_mark:');
};

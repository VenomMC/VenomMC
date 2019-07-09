module.exports.run = message => {
  if (message.channel.name !== 'staff-loa') return;
  if (!message.channel.permissionsFor(message.guild.me).has(['VIEW_CHANNEL', 'SEND_MESSAGES'])) return;
  if (!message.content.includes('Reason: ')) return;
  if (message.content.includes('Reason: I don\'t have time')) return message.reply('Declined :x:');

  message.guild.channels.find(c => c.name === 'management-loa-logs' && c.type === 'text').send(message.content);
  return message.reply('Accepted :white_check_mark:');
};

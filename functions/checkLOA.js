module.exports.run = message => {
  if (message.channel.name !== 'staff-loa') return;
  if (!message.channel.permissionsFor(message.guild.me).has(['VIEW_CHANNEL', 'SEND_MESSAGES'])) return;
  if (message.content.includes('Reason: I don\'t have time')) return;

  return message.reply('Accepted :white_check_mark:');
};

function sendMsg(client, member) {
  const channel = member.guild.channels.find(c => c.name === 'welcome-goodbye');
  if (!channel) return;
  if (!channel.permissionsFor(member.guild.me).has(['VIEW_CHANNEL', 'SEND_MESSAGES'])) return;

  channel.send(`:negative_squared_cross_mark: ${member} left **${client.escMD(member.guild.name)}**`);
}

module.exports.run = client => {
  return client.on('guildMemberRemove', member => {
    if (!member.guild.available) return;

    sendMsg(client, member);
  });
};

function sendMsg (client, member) {
  const channel = member.guild.channels.cache.find(c => c.name === 'welcome-goodbye');
  if (!channel) return;
  if (!channel.permissionsFor(member.guild.me).has([ 'VIEW_CHANNEL', 'SEND_MESSAGES' ])) return;

  channel.send(`:negative_squared_cross_mark: ${member.user.tag} left **${client.escMD(member.guild.name)}**`);
}

module.exports.run = (client, member) => {
  if (!member.guild.available) return;
  if (member.guild.id !== client.config.officialserver) return;

  sendMsg(client, member);
};

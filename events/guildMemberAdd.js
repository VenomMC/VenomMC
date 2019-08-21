function addRole (member) {
  if (!member.guild.me.hasPermission('MANAGE_ROLES')) return;
  const role = member.guild.roles.find(r => r.name === 'Member');
  if (!role) return;
  if (role.position >= member.guild.me.roles.highest.position) return;

  member.roles.add(role);
}

function sendMsg (member) {
  const channel = member.guild.channels.find(c => c.name === 'welcome-goodbye');
  if (!channel) return;
  if (!channel.permissionsFor(member.guild.me).has([ 'VIEW_CHANNEL', 'SEND_MESSAGES' ])) return;

  channel.send(`
Hello ${member}, Welcome to **Venom | Official Discord!**

:large_blue_diamond: •[Information]• :large_blue_diamond:
•IP: play.venommc.net 
• Website: https://www.venommc.net/
• Discord: https://discord.gg/buwceKF
• Sponsor: HostLabs - https://discord.gg/CETRcad
((Make a new invite for personal use))
  `);
}

module.exports.run = (client, member) => {
  if (!member.guild.available) return;
  if (member.guild.id !== client.config.officialserver) return;

  addRole(member);
  sendMsg(member);
};

function addRole(member) {
  if (!member.guild.me.hasPermission('MANAGE_ROLES')) return;
  const role = member.guild.roles.find(r => r.name === 'Member');
  if (!role) return;
  if (role.position >= member.guild.me.roles.highest.position) return;

  return member.roles.add(role);
}

function sendMsg(member) {
  const channel = member.guild.channels.find(c => c.name === 'welcome-goodbye');
  if (!channel) return;
  if (!channel.permissionsFor(member.guild.me).has(['VIEW_CHANNEL', 'SEND_MESSAGES'])) return;

  channel.send(`
  Hello ${member} (${member.user.tag}), Welcome to VenomMC :snake:!! Please read the rules before doing anything else!
  Make sure to check out our hosting partners, HostLabs. You can find their discord below:
  HostLabs - https://discord.gg/CETRcad
  You can find all the information for the server inside of the discord. Have a great time in VenomMC!
  `);
}

module.exports.run = client => {
  return client.on('guildMemberAdd', member => {
    if (!member.guild.available) return;

    addRole(member);
    sendMsg(member);
  });
};

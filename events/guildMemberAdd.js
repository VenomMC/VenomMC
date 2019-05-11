module.exports.run = client => {
  return client.on('guildMemberAdd', member => {
    if (!member.guild.available) return;
    if (member.partial) return;

    if (!member.guild.me.hasPermission('MANAGE_ROLES')) return;
    const role = member.guild.roles.find(r => r.name === 'Member');
    if (!role) return;
    if (role.position >= member.guild.me.roles.highest.position) return;

    return member.roles.add(role);
  });
};

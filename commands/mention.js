module.exports.run = async (client, message, args) => {
  if (!message.channel.permissionsFor(message.member).has('MENTION_EVERYONE')) return message.reply(':x: You are missing the `Mention Everyone` permission in this channel.');

  const role = message.guild.roles.find(r => r.name === 'Notifications');
  if (!role) return message.reply(':x: I did not find the `Notifications` role.');
  if (!message.guild.me.hasPermission('MANAGE_ROLES')) return message.reply(':x: I am missing the `Manage Roles` permission.');
  if (role.position >= message.guild.me.roles.highest.position) return message.reply(':x: The notifications role must be below my highest role.');

  if (!role.mentionable) await role.setMentionable(true);
  await message.channel.send(role.toString());
  return await role.setMentionable(false);
};

module.exports.help = {
  desc: 'Pings the notification role.',
  usage: 'mention'
};

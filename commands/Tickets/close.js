module.exports.run = (client, message, args) => {
  if (!message.channel.name.startsWith('ticket') || message.channel.parentID !== client.config.ticketcategory) return message.reply(':x: You may only use this command in ticket channels!');

  const category = message.guild.channels.cache.get(client.config.ticketcategory);
  if (!category) return message.reply(':x: I did not find the ticket category.');

  if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply(':x: I do not have the required permission `Manage Channels`.');
  if (!category.permissionsFor(client.user).has('MANAGE_CHANNELS')) return message.reply(':x: I do not have the required permission `Manage Channels` in the ticket category.');

  return message.channel.delete();
};

module.exports.help = {
  category: 'Tickets',
  desc: 'Closes a ticket.',
  usage: 'close',
  venom: true
};

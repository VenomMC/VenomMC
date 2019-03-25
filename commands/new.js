module.exports.run = async (client, message, args) => {
  const category = message.guild.channels.get(client.config.ticketcategory);
  if (!category) return message.reply(':x: I did not find the ticket category.');

  if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.reply(':x: I do not have the required permission `Manage Channels`.');
  if (!category.permissionsFor(client.user).has('MANAGE_CHANNELS')) return message.reply(':x: I do not have the required permission `Manage Channels` in the ticket category.');

  if (message.guild.channels.find(c => c.name.startsWith('ticket') && c.topic && c.topic === message.author.id && c.parentID === client.config.ticketcategory)) return message.reply(':x: You already have a ticket open! Please close that one before making another one.');

  const channel = await message.guild.channels.create(`ticket-${message.author.username}`, {
    parent: category,
    topic: message.author.id,
    permissionOverwrites: [
      {
        id: message.author.id,
        allow: ['READ_MESSAGES', 'SEND_MESSAGES'],
        type: 'member'
      },
      {
        id: message.guild.id, // @everyone Role
        deny: ['READ_MESSAGES'],
        type: 'role'
      }
    ]
  });

  const embed = new client.Discord.MessageEmbed()
    .setTitle('New Ticket Created')
    .setDescription(`:white_check_mark: Successfully created a ticket. Your ticket is ${channel}.`)
    .setColor(0x00FF00);

  return message.channel.send(embed);
};

module.exports.help = {
  desc: 'Creates a ticket.',
  usage: 'new'
};

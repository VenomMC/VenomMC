module.exports.run = async (client, message, args) => {
  const member = args[1] ? await message.guild.members.fetch(args[1].replace(/[<>@!?]/g, '')).catch(() => false) : message.member;
  if (!member) return message.reply(':x: I did not find that member.');

  return message.channel.send(`**${client.escMD(member.user.tag)}**'s "no u" counter is **${client.nou[member.id] || 0}**.`);
};

module.exports.help = {
  category: 'Fun',
  desc: 'Displays a "no u" counter.',
  usage: 'nou [Member]'
};

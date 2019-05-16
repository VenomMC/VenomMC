module.exports.run = (client, message, args) => {
  if (!client.config.owners.includes(message.author.id)) return message.reply(':x: Only bot owners may use this command.');

  if (!args[1]) return message.reply(':x: You need to provide a member to DM.');
  const member = message.guild.members.get(args[1].replace(/[<>@!?]/g, ''));
  if (!member) return message.reply(':x: The member you provided was invalid or missing.');
  if (member.user === client.user) return message.reply(':x: I cannot DM myself.');

  if (!args[2]) return message.reply(':x: You must provide content to send.');
  const msg = args.slice(2).join(' ');

  try {
    return member.send(msg);
  } catch (e) {
    return message.reply(':x: That member either had DMs disabled or blocked the bot.');
  }
};

module.exports.help = {
  desc: 'DMs a member.',
  usage: 'dm <Member> <Message>'
};

module.exports.private = true;

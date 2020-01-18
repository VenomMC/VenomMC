module.exports.run = async (client, message, args) => {
  if (!args[1]) return message.reply('You must provide a member to rep.');
  const member = message.guild.members.get(args[1].replace(/[<>@!?]/g, ''));
  if (!member) return message.reply('The member provided was invalid.');
  if (member.user.bot) return message.reply('You cannot rep a bot.');
  if (!member.roles.has(client.config.staffrole)) return message.reply('The member has to be a staff member.');

  const row = (await client.query('SELECT * FROM rep WHERE userid = $1 AND active = $2', [ member.id, true ])).rows[0];
  let type = 'neutral';
  if (row && row.bool) type = 'positive';
  else if (row && !row.bool) type = 'negative';
  if (!args[2]) return message.channel.send(`The current rep for ${client.escMD(member.user.tag)} (ID: ${member.id}) is ${type}.`);
  if (!client.config.owners.includes(message.author.id)) return message.reply('Only bot owners can set reps for staff members.');
  if (member.id === message.author.id) return message.reply('You cannot rep yourself.');

  if (![ '+', '-' ].includes(args[2])) return message.reply('I did not receive a "+" or a "-". Please try again.');
  const bool = args[2] === '+';
  if (row && row.bool === bool) return message.reply(`The rep for that member is already ${bool ? 'positive' : 'negative'}.`);

  if (row) client.query('UPDATE rep SET active = $1 WHERE userid = $2 AND active = $3', [ false, member.id, true ]);
  client.query('INSERT INTO rep (active, bool, by, time, userid) VALUES ($1, $2, $3, $4, $5)', [ true, bool, message.author.id, Date.now(), member.id ]);
  return message.channel.send(`Successfully set the rep for ${client.escMD(member.user.tag)} to ${bool ? 'positive' : 'negative'}.`);
};

module.exports.help = {
  desc: 'Gives a member a rep.',
  usage: 'rep <Member> ["+"|"-"]'
};

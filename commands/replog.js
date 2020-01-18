async function verifyStaff (client, guild) {
  const { rows } = await client.query('SELECT * FROM rep ORDER BY time DESC LIMIT 10');
  const invalid = rows.find(r => !guild.members.has(r.userid) || !guild.members.get(r.userid).roles.has(client.config.staffrole));
  if (invalid) {
    await client.query('DELETE FROM rep WHERE userid = $1', [ invalid.userid ]);
    return verifyStaff(client, guild);
  }

  return rows;
}

module.exports.run = async (client, message, args) => {
  if (!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.reply(':x: I do not have the required permission `Embed Links` in this channel.');

  const rows = await verifyStaff(client, message.guild);
  if (rows.length === 0) return message.reply('There has been no records of reps.');

  const embed = new client.Discord.MessageEmbed()
    .setColor(0x00FF00)
    .setDescription(rows.map(r => `**${client.functions.formatTime(Date.now() - r.time)} ago** - ${client.escMD(client.users.get(r.userid).tag)} \`${r.bool ? 'POSITIVE' : 'NEGATIVE'}\` by ${client.escMD(client.users.get(r.by).tag)}`).join('\n'))
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()
    .setTitle('Recent Reputation Updates');

  return message.channel.send(embed);
};

module.exports.help = {
  desc: 'Gets logs for the past 10 reps.',
  usage: 'replog'
};

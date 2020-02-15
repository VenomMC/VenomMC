module.exports.run = (client, message, args) => {
  if (!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.reply(':x: I do not have the required permission `Embed Links` in this channel.');
  if (!args[1]) {
    const categories = {};
    client.categories.forEach(category => {
      categories[category] = client.commands.filter(cmd => cmd.help.category === category);
    });
    const embed = new client.Discord.MessageEmbed()
      .setTitle('Commands List')
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setColor(0x00FF00);

    for (const category in categories) {
      if (Object.prototype.hasOwnProperty.call(categories, category)) {
        const output = categories[category].map(cmd => `- \`${client.config.prefix}${client.commands.findKey(c => c === cmd)}\``);
        embed.addField(category, output.join('\n'), true);
      }
    }

    return message.channel.send(embed);
  }

  const cmd = args[1].toLowerCase();
  if (!client.commands.has(cmd)) return message.reply(`:x: I did not find \`${client.escMD(cmd)}\` from my commands list.`);
  if (client.commands.get(cmd).private && !client.config.owners.includes(message.author.id)) return message.reply(':x: Sorry, but that command is private.');

  const info = client.commands.get(cmd).help;
  const embed = new client.Discord.MessageEmbed()
    .setTitle(`${client.config.prefix + cmd} Command Info`)
    .addField('Description', info.desc, true)
    .addField('Usage', client.config.prefix + info.usage, true)
    .addField('Category', info.category, true)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setColor(0x00FF00);

  return message.channel.send(embed);
};

module.exports.help = {
  category: 'Miscellaneous',
  desc: 'Displays the help menu.',
  usage: 'help [Command]'
};

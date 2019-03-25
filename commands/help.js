module.exports.run = (client, message, args) => {
  if (!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.reply(':x: I do not have the required permission `Embed Links` in this channel.');
  if (!args[1]) {
    const commands = client.commands.keyArray().map(cmd => `${client.config.prefix}**${cmd}**`);
    const embed = new client.Discord.MessageEmbed()
      .setTitle('Commands List')
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setColor(0x00FF00)
      .setDescription(commands.join('\n'));

    return message.channel.send(embed);
  } else {
    const cmd = args[1].toLowerCase();
    if (!client.commands.has(cmd)) return message.reply(`:x: I did not find \`${client.escMD(cmd)}\` from my commands list.`);

    const info = client.commands.get(cmd).help;
    const embed = new client.Discord.MessageEmbed()
      .setTitle(`${client.config.prefix + cmd} Command Info`)
      .addField('Description', info.desc, true)
      .addField('Usage', client.config.prefix + info.usage, true)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setColor(0x00FF00);

    return message.channel.send(embed);
  }
};

module.exports.help = {
  desc: 'Displays the help menu.',
  usage: 'help [Command]'
};

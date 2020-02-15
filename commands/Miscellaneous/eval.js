const util = require('util');

function clean (text) {
  if (typeof text === 'string') {
    return text.replace(/`/g, `\`${String.fromCharCode(8203).replace(/@/g, `@${String.fromCharCode(8203)}`)}`);
  }

  return text;
}

module.exports.run = (client, message, args) => {
  if (!client.config.owners.includes(message.author.id)) return message.reply(':x: Only the bot owners may use this command.');
  if (!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.reply(':x: I am missing the required permission `Embed Links` in this channel.');

  const code = args.slice(1).join(' ');
  if (!code) return message.reply(':x: Give me code to evaluate nub');

  try {
    let evaled = eval(code);
    if (typeof evaled !== 'string') evaled = util.inspect(evaled);

    const embed = new client.Discord.MessageEmbed()
      .setAuthor('Evaluation')
      .setTitle('Output')
      .setDescription(`\`\`\`xl\n${clean(evaled).length <= 2048 ? clean(evaled) : 'Over 2048 Characters'}\n\`\`\``)
      .setColor(0x00FF00)
      .setTimestamp();
    return message.channel.send(embed);
  } catch (e) {
    return message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(e)}\n\`\`\``);
  }
};

module.exports.help = {
  category: 'Miscellaneous',
  desc: 'Evaluates code.',
  usage: 'eval <Code>'
};

module.exports.private = true;

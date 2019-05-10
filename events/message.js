module.exports.run = client => {
  return client.on('message', message => {
    if (!message.guild || !message.guild.available) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(client.config.prefix) || message.content === client.config.prefix) return;

    const args = message.content.slice(client.config.prefix.length).split(/ +/g);
    const cmd = args[0].toLowerCase();

    if (!client.commands.has(cmd)) return;
    return client.commands.get(cmd).run(client, message, args);
  });
};

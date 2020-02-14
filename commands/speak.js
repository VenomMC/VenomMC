module.exports.run = (client, message, args) => {
  if (!client.config.owners.includes(message.author.id)) return message.reply(':x: Only bot owners may use this command.');

  if (!args[1]) return message.reply(':x: You have to proivde a channel for me to say something in!');
  const channel = message.guild.channels.cache.get(args[1].replace(/[<>#]/g, ''));
  if (!channel) return message.reply(':x: The channel you provided was invalid or missing.');
  if (!channel.permissionsFor(client.user).has([ 'VIEW_CHANNEL', 'SEND_MESSAGES' ])) return message.reply(':x: I am missing permissions from the said channel.\n\n`View Channels\nSend Messages`');

  if (!args[2]) return message.reply(':x: You have to provide a message for me to say!');
  const msg = args.slice(2).join(' ');

  channel.send(msg, {
    disableEveryone: false
  });
  return message.delete();
};

module.exports.help = {
  desc: 'Says something in a channel.',
  usage: 'speak <Channel> <Message>'
};

module.exports.private = true;

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
  console.log(`Successfully signed in as ${client.user.tag}.`);
  return client.user.setActivity(`${client.guilds.size} Servers`);
});

client.on('message', message => {
  if (!message.guild || !message.guild.available) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix) || message.content === config.prefix) return;

  const args = message.content.slice(config.prefix.length).split(/ +/g);
  const cmd = args[0].toLowerCase();

  switch (cmd) {
    case 'announce':
      const channel = message.guild.channels.find(chan => chan.type === 'text' && chan.name === 'announcements');
      if (!channel) return message.reply('I did not find the announcements channel.');
      if (!channel.permissionsFor(client.user).has(['VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS'])) return message.reply('I am missing permissions in the announcements channel. Please make sure I have the following permissions.\n\n`View Channel\nSend Messages\nEmbed Links`');

      if (!args[1]) return message.reply('You have to provide content for me to announce!');
      const content = args.slice(1).join(' ');

      const embed = new Discord.MessageEmbed()
        .setTitle('New Announcement')
        .setFooter(`Sent by ${message.member.displayName}`, message.author.displayAvatarURL())
        .setDescription(content)
        .setColor(0x00FF00)
        .setTimestamp();

      channel.send(embed);
      return message.channel.send('Successfully announced something to the announcements channel.');
  }
});

client.login(config.token);

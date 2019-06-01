module.exports.run = (client, message, args) => {
  const music = client.functions.get('music');
  if (!music.playing) return message.reply(':x: I am not playing anything.');
  if (music.connection.channel.id !== message.member.voice.channelID) return message.reply(':x: You must be in the same voice channel as me to use this command.');
  if (music.skippers.includes(message.author.id)) return message.reply(':x: You already voted to skip this song.');

  music.skips += 1;
  const requiredSkips = Math.floor(message.member.voice.channel.members.filter(m => !m.user.bot).size / 2);
  if (music.skips >= requiredSkips) {
    music.dispatcher.end();
    return message.channel.send('Successfully skipped a song.');
  }

  music.skippers.push(message.author.id);
  return message.channel.send(`Your skip has been acknowledged. You need **${requiredSkips - music.skips}** more skips!`);
};

module.exports.help = {
  desc: 'Votes to skip a song.',
  usage: 'skip'
};

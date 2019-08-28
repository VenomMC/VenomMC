module.exports.run = async (client, message, args) => {
  const music = client.functions.get('music');
  if (music.connection && music.connection.channel.id !== message.member.voice.channelID) return message.reply(':x: You must be in the same voice channel as me to use this command.');

  if (music.connection) music.connection.channel.leave();
  else if (message.guild.me.voice.channel) return message.guild.me.voice.channel.leave();
  music.endSession();
  return message.channel.send('Successfully left the voice channel.');
};

module.exports.help = {
  desc: 'Leaves the voice channel the bot is in. This could be seen as a force music stop.',
  usage: 'leave'
};

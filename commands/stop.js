module.exports.run = async (client, message, args) => {
  const music = client.functions.get('music');
  if (!music.playing) return message.reply(':x: I am not playing anything.');
  if (music.connection.channel.id !== message.member.voice.channelID) return message.reply(':x: You must be in the same voice channel as me to use this command.');

  music.connection.channel.leave();
  music.endSession();
  return message.channel.send('Successfully stopped the music.');
};

module.exports.help = {
  desc: 'Stops playing music.',
  usage: 'stop'
};

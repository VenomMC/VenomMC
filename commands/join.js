module.exports.run = (client, message, args) => {
  if (!message.member.voice.channel) return message.reply(':x: You must be in a voice channel to run this command.');
  const vc = message.member.voice.channel;
  if (!vc.joinable) return message.reply(':x: I am missing permissions to join your voice channel or the voice channel is full.');

  vc.join();
  return message.channel.send('Successfully joined your voice channel.');
};

module.exports.help = {
  desc: 'Joins your voice channel.',
  usage: 'join'
};

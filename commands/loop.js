module.exports.run = (client, message, args) => {
  const music = client.functions.get('music');
  if (!music.playing) return message.reply(':x: I am not playing anything.');
  if (music.connection.channel.id !== message.member.voice.channelID) return message.reply(':x: You must be in the same voice channel as me to use this command.');

  if (args[1] && [ 'on', 'off' ].includes(args[1].toLowerCase())) return message.reply(':x: You must provide "On" or "Off".');
  const bool = args[1] ? args[1].toLowerCase() === 'on' : !music.looping;
  music.looping = bool;
  return message.channel.send(`Successfully turned ${bool ? 'on' : 'off'} looping.`);
};

module.exports.help = {
  desc: 'Toggles loop for music.',
  usage: 'loop [On/Off]'
};

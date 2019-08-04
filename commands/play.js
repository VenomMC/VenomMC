module.exports.run = async (client, message, args) => {
  const music = client.functions.get('music');
  if (!message.member.voice.channel) return message.reply(':x: You must be in a voice channel to use this command.');
  const vc = message.member.voice.channel;
  if (music.playing && vc.id !== message.guild.me.voice.channelID) return message.reply(':x: You must be in the same voice channel as me to use that command.');
  if (!vc.permissionsFor(client.user).has([ 'CONNECT', 'SPEAK' ])) return message.reply(':x: I do not have the required permissions in your voice channel.\n\n`Connect\nSpeak`');
  if (!message.channel.permissionsFor(client.user).has('EMBED_LINKS')) return message.reply(':x: I do not have the required permission `Embed Links` in this channel.');

  if (music.queue.length >= 10) return message.reply(':x: The maximum amount of songs in the queue has been reached.');

  if (!args[1]) return message.reply(':x: You need to provide a video title.');
  const query = args.slice(1).join(' ');

  const video = await music.searchVideo(query);
  if (!video) return message.reply(':x: I did not find a result from that query.');
  if (music.queue.some(v => v.id === video.id)) return message.reply(':x: That song is already in the queue.');

  music.queue.push(video);
  music.sendInfo(video, message.channel, client);
  if (!music.playing) {
    music.playing = true;
    music.playMusic(video, vc);
  }

  return undefined;
};

module.exports.help = {
  desc: 'Plays music.',
  usage: 'play <Video Title>'
};

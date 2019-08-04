const ytdl = require('ytdl-core-discord');
const sya = require('simple-youtube-api');
const youtube = new sya(process.env.YT_API_KEY);

module.exports = {
  connection: null,
  dispatcher: null,
  looping: false,
  queue: [],
  playing: false,
  skippers: [],
  skips: 0,

  endSession: function () {
    this.connection = null;
    this.dispatcher = null;
    this.queue = [];
    this.playing = false;
    this.skippers = [];
    this.skips = 0;
  },

  playMusic: async function (video, vc) {
    if (!this.connection) this.connection = await vc.join();

    this.dispatcher = this.connection.play(await ytdl(video.url), { type: 'opus' });
    this.dispatcher.setVolumeLogarithmic(0.4);
    this.dispatcher.once('finish', () => {
      if (this.looping) this.queue.push(this.queue.shift());
      else this.queue.shift();
      this.skippers = [];
      this.skips = 0;

      if (this.queue.length === 0) {
        vc.leave();
        return this.endSession();
      }

      return setTimeout(this.playMusic.bind(this), 500, this.queue[0], this.connection.channel);
    });
  },

  searchVideo: async function (q) {
    const videos = await youtube.searchVideos(q, 1);
    if (!videos[0]) return false;

    return videos[0];
  },

  sendInfo: function (video, channel, client) {
    const embed = new client.Discord.MessageEmbed()
      .setURL(video.url)
      .setThumbnail(video.thumbnails.high.url)
      .setFooter('Published at')
      .setTimestamp(video.publishedAt)
      .setColor(0x00FF00);

    if (!this.playing) embed.setTitle(`Now Playing: ${video.title}`);
    else embed.setTitle(`Added to Queue: ${video.title}`);

    return channel.send(embed);
  }
};

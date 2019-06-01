const ytdl = require('ytdl-core-discord');
const youtube = new (require('simple-youtube-api'))(process.env.YT_API_KEY);

module.exports = {
  connection: null,
  dispatcher: null,
  queue: [],
  playing: false,

  endSession() {
    this.connection = null;
    this.dispatcher = null;
    this.queue = [];
    this.playing = false;
    this.skippers = [];
    this.skips = 0;
  },

  async playMusic(video, vc) {
    if (!this.connection) this.connection = await vc.join();

    this.dispatcher = this.connection.play(await ytdl(video.url), { type: 'opus' });
    this.dispatcher.setVolumeLogarithmic(0.4);
    this.dispatcher.once('finish', () => {
      this.queue.shift();
      this.skippers = [];
      this.skips = 0;

      if (this.queue.length === 0) {
        vc.leave();
        return this.endSession();
      }

      return setTimeout(this.playMusic.bind(this), 500, this.queue[0], this.connection.channel);
    });
  },

  async searchVideo(q) {
    const videos = await youtube.searchVideos(q, 1);
    if (!videos[0]) return false;

    return videos[0];
  },

  sendInfo(video, channel, client) {
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

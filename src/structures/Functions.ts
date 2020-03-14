import { GuildMessage } from 'VenomBot';
import { MessageEmbed, TextChannel } from 'discord.js';

export class Functions {
  public automod (message: GuildMessage): string | false {
    if (this.arr[0] === message.author.id) {
      if (this.arr[1] >= 8) return 'flood';
      this.arr[1] += 1;
    } else this.arr = [ message.author.id, 1 ];

    return false;
  }

  public checkLOA (message: GuildMessage): void {
    if (message.channel.name !== 'staff-loa') return;
    if (!message.channel.permissionsFor(message.guild.me!)!.has([ 'VIEW_CHANNEL', 'SEND_MESSAGES' ])) return;
    if (!message.content.toLowerCase().includes('reason: ')) return;
    if (message.content.toLowerCase().includes('reason: i don\'t have time')) {
      message.reply('Declined :x:');
      return;
    }
    if (!this.acceptedReasons.some(r => message.content.toLowerCase().includes(`reason: ${r}`))) return;

    const embed = new MessageEmbed()
      .setTitle('New LOA Reported')
      .setDescription(message.content)
      .setFooter(`Sent by: ${message.author.tag}`, message.author.displayAvatarURL())
      .setColor(0x00FF00);

    const channel = message.guild.channels.cache.find(c => c.name === 'management-loa-logs' && c.type === 'text') as TextChannel | undefined;
    if (channel) channel.send(embed);
    message.reply('Accepted :white_check_mark:');
  }

  public formatTime (timeLeft: number): string {
    const h = Math.floor(timeLeft / 1000 / 60 / 60 % 24);
    const m = Math.floor(timeLeft / 1000 / 60 % 60);
    const s = Math.ceil(timeLeft / 1000 % 60);

    return `${h}h ${m}m ${s}s`;
  }

  private acceptedReasons = [
    'family issues',
    'vacation',
    'school related',
    'holiday',
    'other'
  ];

  private arr: [string, number] = [ 'temp', 0 ];
}

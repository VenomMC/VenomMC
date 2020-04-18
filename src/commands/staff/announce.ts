import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';
import { MessageEmbed, NewsChannel, PermissionString } from 'discord.js';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  const channel = message.guild.channels.cache.find(chan => chan.type === 'news' && chan.name === 'announcements') as NewsChannel | undefined;
  if (!channel) return message.reply('I did not find the announcements channel.');
  if (!channel.permissionsFor(client.user!)!.has([ 'VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS' ])) return message.reply('I am missing permissions in the announcements channel. Please make sure I have the following permissions.\n\n`View Channel\nSend Messages\nEmbed Links`');

  if (!args[1]) return message.reply('You have to provide content for me to announce!');
  const content = args.slice(1).join(' ');

  const embed = new MessageEmbed()
    .setTitle('New Announcement')
    .setFooter(`Sent by ${message.member.displayName}`, message.author.displayAvatarURL())
    .setDescription(content)
    .setColor(0x00FF00)
    .setTimestamp();

  channel.send(embed);
  message.channel.send('Successfully announced something to the announcements channel.');
}

export const help: HelpObj = {
  aliases: [],
  category: 'Staff',
  desc: 'Announces something to #announcements.',
  usage: 'announce <Content>'
};

export const clientPerms: PermissionString[] = [];

export const memberPerms: PermissionString[] = [
  'MANAGE_GUILD'
];

import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';
import { PermissionString, TextChannel } from 'discord.js';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  if (!args[1]) return message.reply(':x: You have to proivde a channel for me to say something in!');
  const channel = message.guild.channels.cache.get(args[1].replace(/[<>#]/g, '')) as TextChannel;
  if (!channel) return message.reply(':x: The channel you provided was invalid or missing.');
  if (channel.type !== 'text') return message.reply(':x: The channel must be a text channel.');
  if (!channel.permissionsFor(client.user!)!.has([ 'VIEW_CHANNEL', 'SEND_MESSAGES' ])) return message.reply(':x: I am missing permissions from the said channel.\n\n`View Channels\nSend Messages`');

  if (!args[2]) return message.reply(':x: You have to provide a message for me to say!');
  const msg = args.slice(2).join(' ');

  channel.send(msg, {
    disableMentions: 'none'
  });
  message.delete();
}

export const help: HelpObj = {
  aliases: [],
  category: 'Staff',
  desc: 'Gives a member a rep.',
  private: true,
  usage: 'rep <Member> [Rep Value]'
};

export const clientPerms: PermissionString[] = [];

export const memberPerms: PermissionString[] = [];

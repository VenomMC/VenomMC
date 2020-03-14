import { PermissionString } from 'discord.js';
import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  if (!args[1]) return message.reply(':x: You must provide a channel to lock.');
  const channel = message.guild.channels.cache.find(c => c.id === args[1].replace(/[<>#]/g, '') && [ 'text', 'voice' ].includes(c.type));
  if (!channel) return message.reply(':x: I did not find a text or voice channel with that query.');
  if (!channel.permissionsFor(client.user!)!.has('MANAGE_CHANNELS')) return message.reply(':x: I do not have enough permissions to edit that channel.');
  if (message.guild.me!.roles.highest.position === 0) return message.reply(':x: My highest role must be above the `@everyone` role.');

  if (channel.type === 'text') channel.createOverwrite(message.guild.id, { SEND_MESSAGES: false }, 'Lock command.');
  else channel.createOverwrite(message.guild.id, { CONNECT: false }, 'Lock command.');

  message.channel.send(`Successfully locked ${channel}.`);
}

export const help: HelpObj = {
  aliases: [],
  category: 'Staff',
  desc: 'Locks a channel.',
  usage: 'lock <Channel>'
};

export const clientPerms: PermissionString[] = [];

export const memberPerms: PermissionString[] = [
  'ADMINISTRATOR'
];

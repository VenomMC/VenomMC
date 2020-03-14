import { PermissionString } from 'discord.js';
import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  if (!message.channel.name.startsWith('ticket') || message.channel.parentID !== client.config.ticketcategory) return message.reply(':x: You may only use this command in ticket channels!');

  const category = message.guild.channels.cache.get(client.config.ticketcategory);
  if (!category) return message.reply(':x: I did not find the ticket category.');
  if (!category.permissionsFor(client.user!)!.has('MANAGE_CHANNELS')) return message.reply(':x: I do not have the required permission `Manage Channels` in the ticket category.');

  message.channel.delete();
}

export const help: HelpObj = {
  aliases: [],
  category: 'Tickets',
  desc: 'Closes a ticket.',
  usage: 'close',
  venom: true
};

export const clientPerms: PermissionString[] = [];

export const memberPerms: PermissionString[] = [];

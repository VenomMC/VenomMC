import { PermissionString } from 'discord.js';
import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  message.channel.send(`The bot has been online for: **${client.functions.formatTime(client.uptime!)}**`);
}

export const help: HelpObj = {
  aliases: [],
  category: 'Miscellaneous',
  desc: 'Outputs the uptime of the bot.',
  usage: 'uptime'
};

export const clientPerms: PermissionString[] = [];

export const memberPerms: PermissionString[] = [];

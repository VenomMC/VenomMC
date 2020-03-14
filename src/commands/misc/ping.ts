import { PermissionString } from 'discord.js';
import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  const msg = await message.channel.send(`Pong! :heartbeat: \`${Math.round(client.ws.ping)}ms\``);
  msg.edit(`${msg.content} :stopwatch: \`${Date.now() - msg.createdTimestamp}ms\``);
}

export const help: HelpObj = {
  aliases: [],
  category: 'Miscellaneous',
  desc: 'Outputs the ping of the bot.',
  usage: 'ping'
};

export const clientPerms: PermissionString[] = [];

export const memberPerms: PermissionString[] = [];

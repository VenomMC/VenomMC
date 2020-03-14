import { PermissionString } from 'discord.js';
import { VenomClient } from '../../structures/Client';
import fetch from 'node-fetch';
import { GuildMessage, HelpObj } from 'VenomBot';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  const json = await fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } }).then(res => res.json());
  if (!json.joke) return message.reply(':x: The dad joke API seems to be down.');
  message.channel.send(json.joke);
}

export const help: HelpObj = {
  aliases: [],
  category: 'Fun',
  desc: 'Tells you a dad joke.',
  usage: 'dadjoke'
};

export const clientPerms: PermissionString[] = [];

export const memberPerms: PermissionString[] = [];

import { PermissionString } from 'discord.js';
import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  const member = args[1] ? await message.guild.members.fetch(args[1].replace(/[<>@!?]/g, '')).catch(() => null) : message.member;
  if (!member) return message.reply(':x: I did not find that member.');

  message.channel.send(`**${client.escMD(member.user.tag)}**'s "no u" counter is **${client.nou[member.id] || 0}**.`);
}

export const help: HelpObj = {
  aliases: [],
  category: 'Fun',
  desc: 'Displays a "no u" counter.',
  usage: 'nou [Member]'
};

export const clientPerms: PermissionString[] = [];

export const memberPerms: PermissionString[] = [];

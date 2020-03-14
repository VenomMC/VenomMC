import { PermissionString } from 'discord.js';
import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  if (!args[1]) return message.reply(':x: You need to provide a member to DM.');
  const member = await message.guild.members.fetch(args[1].replace(/[<>@!?]/g, '')).catch(() => null);
  if (!member) return message.reply(':x: The member you provided was invalid or missing.');
  if (member.user === client.user) return message.reply(':x: I cannot DM myself.');

  if (!args[2]) return message.reply(':x: You must provide content to send.');
  const msg = args.slice(2).join(' ');

  try {
    message.channel.send(`Successfully sent a DM to ${member.user.tag}.`);
    member.send(msg);
  } catch (e) {
    message.reply(':x: That member either had DMs disabled or blocked the bot.');
  }
}

export const help: HelpObj = {
  aliases: [],
  category: 'Staff',
  desc: 'DMs a member.',
  private: true,
  usage: 'dm <Member> <Message>'
};

export const clientPerms: PermissionString[] = [];

export const memberPerms: PermissionString[] = [];

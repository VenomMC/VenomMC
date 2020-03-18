import { PermissionString } from 'discord.js';
import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  if (!message.member.roles.cache.some(r => r.name === 'Management')) return message.reply('You must be part of Management to use this command.');
  if (message.channel.name !== 'management-bot-commands') return message.reply('You can only run this command in #management-bot-commands.');

  if (!args[1]) return message.reply('You must provide a member to remove the Pending status from.');
  const member = await message.guild.members.fetch(args[1].replace(/[<>@!?]/g, '')).catch(() => null);
  if (!member) return message.reply('That member was invalid.');

  const pending = message.guild.roles.cache.find(r => r.name === 'Pending');
  if (!pending) return message.reply('I did not find the role "Pending".');
  if (message.guild.me!.roles.highest.comparePositionTo(pending) <= 0) return message.reply('My role position is not high enough to remove the Pending role.');

  const { rows } = await client.query('SELECT * FROM pending WHERE userid = $1', [ member.id ]);
  if (rows.length === 0) return message.reply('That member is not in a Pending status.');

  if (member.roles.cache.has(pending.id)) member.roles.remove(pending);
  client.query('DELETE FROM pending WHERE userid = $1', [ member.id ]);
  message.channel.send(`Successfully removed \`\`${client.escInline(member.user.tag)}\`\` from the Pending status.`);
}

export const help: HelpObj = {
  aliases: [],
  category: 'Staff',
  desc: 'Removes a member from the Pending status.',
  usage: 'remove <Member>',
  venom: true
};

export const clientPerms: PermissionString[] = [
  'MANAGE_ROLES'
];

export const memberPerms: PermissionString[] = [];

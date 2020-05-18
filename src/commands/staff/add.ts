import { PermissionString } from 'discord.js';
import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  if (!message.member.roles.cache.some(r => r.name === 'Management')) return message.reply('You must be part of Management to use this command.');
  if (message.channel.name !== 'management-bot-commands') return message.reply('You can only run this command in #management-bot-commands.');

  if (!args[1]) return message.reply('You must provide a member to give the Pending status to.');
  const member = await message.guild.members.fetch(args[1].replace(/[<>@!?]/g, '')).catch(() => null);
  if (!member) return message.reply('That member was invalid.');
  if (member.roles.cache.has(client.config.staffrole)) return message.reply('That member is already a staff member.');

  const pending = message.guild.roles.cache.find(r => r.name === 'Pending');
  if (!pending) return message.reply('I did not find the role "Pending".');
  if (message.guild.me!.roles.highest.comparePositionTo(pending) <= 0) return message.reply('My role position is not high enough to assign the Pending role.');

  const { rows } = await client.query('SELECT * FROM pending WHERE userid = $1', [ member.id ]);
  if (rows.length === 1) return message.reply('That member is already Pending.');

  member.roles.add(pending);
  client.query('INSERT INTO pending (userid) VALUES ($1)', [ member.id ]);
  message.channel.send(`Successfully set \`\`${client.escInline(member.user.tag)}\`\`'s status to Pending.`);
}

export const help: HelpObj = {
  aliases: [],
  category: 'Staff',
  desc: 'Adds a member as "Pending" and removes the role in the next Sunday at midnight UTC. Once this period is over, the user will receive the Helper and Staff roles.'
    + 'This can be cancelled mid-way with +remove.',
  usage: 'add <Member>',
  venom: true
};

export const clientPerms: PermissionString[] = [
  'MANAGE_ROLES'
];

export const memberPerms: PermissionString[] = [];

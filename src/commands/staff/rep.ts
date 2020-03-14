import { PermissionString } from 'discord.js';
import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj, RowRep } from 'VenomBot';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  if (!args[1]) return message.reply('You must provide a member to rep.');
  const member = message.guild.members.cache.get(args[1].replace(/[<>@!?]/g, ''));
  if (!member) return message.reply('The member provided was invalid.');
  if (member.user.bot) return message.reply('You cannot rep a bot.');

  const row = (await client.query<RowRep>('SELECT * FROM rep WHERE userid = $1 AND active = $2', [ member.id, true ])).rows[0];
  if (!args[2]) return message.channel.send(`The current rep for ${client.escMD(member.user.tag)} (ID: ${member.id}) is ${row ? row.val : 0}.`);
  if (!client.config.owners.includes(message.author.id)) return message.reply('Only bot owners can set reps for staff members.');
  if (member.id === message.author.id) return message.reply('You cannot rep yourself.');

  const val = parseInt(args[2]);
  if (isNaN(val)) return message.reply('The reputation value must be a number.');
  if (val < -100 || val > 100) return message.reply('The rep value must be from -100 to 100.');
  if (row && row.val === val) return message.reply(`The rep for that member is already \`${val}\`.`);

  if (row) client.query('UPDATE rep SET active = $1 WHERE userid = $2 AND active = $3', [ false, member.id, true ]);
  client.query('INSERT INTO rep (active, by, time, userid, val) VALUES ($1, $2, $3, $4, $5)', [ true, message.author.id, Date.now(), member.id, val ]);
  message.channel.send(`Successfully set the rep for ${client.escMD(member.user.tag)} to \`${val}\`.`);
}

export const help: HelpObj = {
  aliases: [],
  category: 'Staff',
  desc: 'Gives a member a rep.',
  usage: 'rep <Member> [Rep Value]',
  venom: true
};

export const clientPerms: PermissionString[] = [];

export const memberPerms: PermissionString[] = [];

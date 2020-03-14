import { VenomClient } from '../../structures/Client';
import { Guild, MessageEmbed, PermissionString } from 'discord.js';
import { GuildMessage, HelpObj, RowRep } from 'VenomBot';

async function verifyStaff (client: VenomClient, guild: Guild): Promise<RowRep[]> {
  const { rows } = await client.query<RowRep>('SELECT * FROM rep ORDER BY time DESC LIMIT 10');
  const invalid = rows.find(r => !guild.members.cache.has(r.userid));
  if (invalid) {
    await client.query('DELETE FROM rep WHERE userid = $1', [ invalid.userid ]);
    return verifyStaff(client, guild);
  }

  return rows;
}

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  const rows = await verifyStaff(client, message.guild);
  if (rows.length === 0) return message.reply('There has been no records of reps.');

  const desc = await Promise.all(rows.map(async r => {
    const user = await client.users.fetch(r.userid);
    return `**${client.functions.formatTime(Date.now() - parseInt(r.time))} ago** - ${client.escMD(user.tag)} \`${r.val}\` by ${client.escMD(user.tag)}`;
  }));

  const embed = new MessageEmbed()
    .setColor(0x00FF00)
    .setDescription(desc.join('\n'))
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp()
    .setTitle('Recent Reputation Updates');

  message.channel.send(embed);
}

export const help: HelpObj = {
  aliases: [],
  category: 'Miscellaneous',
  desc: 'Gets logs for the past 10 reps.',
  usage: 'replog',
  venom: true
};

export const clientPerms: PermissionString[] = [
  'EMBED_LINKS'
];

export const memberPerms: PermissionString[] = [];

import { GuildMember } from 'discord.js';
import { VenomClient } from '../structures/Client';

function sendMsg (client: VenomClient, member: GuildMember) {
  const channel = member.guild.channels.cache.find(c => c.name === 'welcome-goodbye');
  if (!channel || channel.type !== 'text') return;
  if (!channel.permissionsFor(member.guild.me!)!.has([ 'VIEW_CHANNEL', 'SEND_MESSAGES' ])) return;

  channel.send(`:negative_squared_cross_mark: ${member.user.tag} left **${client.escMD(member.guild.name)}**`);
}

export async function run (client: VenomClient, member: GuildMember) {
  if (!member.guild.available) return;
  if (member.guild.id !== client.config.officialserver) return;

  sendMsg(client, member);
}

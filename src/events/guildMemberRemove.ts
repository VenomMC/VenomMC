import { VenomClient } from '../structures/Client';
import { GuildMember, TextChannel } from 'discord.js';

function sendMsg (client: VenomClient, member: GuildMember) {
  const channel = member.guild.channels.cache.find(c => c.name === 'welcome-goodbye');
  if (!channel || !(channel instanceof TextChannel)) return;
  if (!channel.permissionsFor(member.guild.me!)!.has([ 'VIEW_CHANNEL', 'SEND_MESSAGES' ])) return;

  channel.send(`:negative_squared_cross_mark: ${member.user.tag} left **${client.escMD(member.guild.name)}**`);
}

export async function run (client: VenomClient, member: GuildMember) {
  if (!member.guild.available) return;
  if (member.guild.id !== client.config.officialserver) return;

  sendMsg(client, member);
}

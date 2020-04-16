import { VenomClient } from '../structures/Client';
import { GuildMember, TextChannel } from 'discord.js';

function addRole (member: GuildMember) {
  if (!member.guild.me!.hasPermission('MANAGE_ROLES')) return;
  const role = member.guild.roles.cache.find(r => r.name === 'Member');
  if (!role) return;
  if (role.position >= member.guild.me!.roles.highest.position) return;

  member.roles.add(role);
}

function sendMsg (member: GuildMember) {
  const channel = member.guild.channels.cache.find(c => c.name === 'welcome-goodbye');
  if (!channel || !(channel instanceof TextChannel)) return;
  if (!channel.permissionsFor(member.guild.me!)!.has([ 'VIEW_CHANNEL', 'SEND_MESSAGES' ])) return;

  channel.send(`
Hello ${member}, Welcome to **Venom | Official Discord!**

:large_blue_diamond: •[Information]• :large_blue_diamond:
•IP: play.venommc.net 
• Website: https://www.venommc.net/
• Discord: https://invite.gg/venommc
• Sponsor: HostLabs - https://discord.gg/CETRcad
((Make a new invite for personal use))
  `);
}

export async function run (client: VenomClient, member: GuildMember) {
  if (!member.guild.available) return;
  if (member.guild.id !== client.config.officialserver) return;

  addRole(member);
  sendMsg(member);
}

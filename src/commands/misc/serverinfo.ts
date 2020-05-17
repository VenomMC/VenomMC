import { VenomClient } from '../../structures/Client';
import fetch from 'node-fetch';
import { GuildMessage, HelpObj } from 'VenomBot';
import { MessageEmbed, PermissionString } from 'discord.js';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  if (!message.channel.permissionsFor(client.user!)!.has('EMBED_LINKS')) return message.reply(':x: I do not have the required permission `Embed Links` in this channel.');
  const body = await fetch('https://mcapi.us/server/status?ip=74.121.190.202&port=25583').then(res => res.json());
  if (body.status !== 'success') return message.reply(':x: Cannot retrieve server information at the time. Issue reoccurring? Contact Spiget.');

  const embed = new MessageEmbed()
    .setTitle('Server Information')
    .addField('Total Members Online', body.online ? body.players.now : 'N/A')
    .addField('Server Status', body.online ? 'Online' : 'Offline')
    .setColor(body.online ? 0x00FF00 : 0xFF0000)
    .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

  message.channel.send(embed);
}

export const help: HelpObj = {
  aliases: [],
  category: 'Miscellaneous',
  desc: 'Displays the information about the Minecraft server.',
  staffonly: true,
  usage: 'serverinfo',
  venom: true
};

export const clientPerms: PermissionString[] = [
  'EMBED_LINKS'
];

export const memberPerms: PermissionString[] = [];

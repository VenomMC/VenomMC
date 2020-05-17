import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';
import { MessageEmbed, PermissionString } from 'discord.js';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  const embed = new MessageEmbed()
    .setTitle('IP to join VenomMC')
    .setDescription(client.config.ip)
    .setColor(0x00FF00);

  message.channel.send(embed);
}

export const help: HelpObj = {
  aliases: [],
  category: 'Miscellaneous',
  desc: 'Displays the IP of the server.',
  staffonly: true,
  usage: 'ip',
  venom: true
};

export const clientPerms: PermissionString[] = [
  'EMBED_LINKS'
];

export const memberPerms: PermissionString[] = [];

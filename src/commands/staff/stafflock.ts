import { PermissionString } from 'discord.js';
import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  const channels = message.guild.channels.cache.filter(c => client.config.staffchannels.includes(c.id));
  if (channels.some(c => !c)) return message.reply(':x: 1 or more of the staff channels has gone missing. Please tell Spiget to recalibrate the IDs.');

  channels.forEach(c => c.overwritePermissions([
    {
      id: client.config.staffrole,
      deny: [ 'SEND_MESSAGES' ]
    }
  ]));
  message.channel.send('Successfully locked all the staff channels.');
}

export const help: HelpObj = {
  aliases: [],
  category: 'Staff',
  desc: 'Locks all the staff channels.',
  usage: 'stafflock',
  venom: true
};

export const clientPerms: PermissionString[] = [];

export const memberPerms: PermissionString[] = [
  'ADMINISTRATOR'
];

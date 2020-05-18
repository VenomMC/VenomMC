import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';
import { MessageEmbed, PermissionString, TextChannel } from 'discord.js';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  if (!args[1]) return message.reply('You must provide a member to add a role to.');
  const member = await message.guild.members.fetch(args[1].replace(/[<>@!?]/g, '')).catch(() => null);
  if (!member) return message.reply('I did not find that member in this server.');

  if (!args[2]) return message.reply('You must provide a role to add.');
  const input = args.slice(2).join(' ');
  let role = message.guild.roles.cache.get(input);
  if (!role) role = message.guild.roles.cache.find(r => r.name === input);
  if (!role) return message.reply('I did not find that role.');

  member.roles.add(role);

  const embed = new MessageEmbed()
    .addField('Member', `${client.escMD(member.user.tag)} (ID: ${member.id})`)
    .addField('Role', `${client.escMD(role.name)} (ID: ${role.id})`)
    .setColor(0x00FF00)
    .setFooter(`Added by ${message.author.tag} (ID: ${message.author.id})`, message.author.displayAvatarURL())
    .setThumbnail(member.user.displayAvatarURL({ size: 2048 }))
    .setTimestamp()
    .setTitle('Role Added');
  (client.channels.cache.get(client.config.roleupdates) as TextChannel).send(embed);

  message.channel.send(`Successfully added ${client.escMD(role.name)} to ${client.escMD(member.user.tag)}.`);
}

export const help: HelpObj = {
  aliases: [],
  category: 'Staff',
  desc: 'Adds a role to a user.',
  staffonly: true,
  usage: 'addrole <User> <Role>',
  venom: true
};

export const clientPerms: PermissionString[] = [
  'MANAGE_ROLES'
];

export const memberPerms: PermissionString[] = [
  'ADMINISTRATOR'
];

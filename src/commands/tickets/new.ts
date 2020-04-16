import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';
import { MessageEmbed, PermissionString, TextChannel } from 'discord.js';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  const category = message.guild.channels.cache.get(client.config.ticketcategory);
  if (!category) return message.reply(':x: I did not find the ticket category.');
  if (!category.permissionsFor(client.user!)!.has('MANAGE_CHANNELS')) return message.reply(':x: I do not have the required permission `Manage Channels` in the ticket category.');

  if (message.guild.channels.cache.find(c => c instanceof TextChannel && c.name.startsWith('ticket') && c.topic === message.author.id && c.parentID === client.config.ticketcategory)) return message.reply(':x: You already have a ticket open! Please close that one before making another one.');

  const channel = await message.guild.channels.create(`ticket-${message.author.username}`, {
    parent: category,
    topic: message.author.id
  });
  channel.createOverwrite(message.author, {
    VIEW_CHANNEL: true,
    SEND_MESSAGES: true
  });
  channel.send('Hey! Thanks for creating a ticket. Our support team will get back to you as soon as possible!');

  const embed = new MessageEmbed()
    .setTitle('New Ticket Created')
    .setDescription(`:white_check_mark: Successfully created a ticket. Your ticket is ${channel}.`)
    .setColor(0x00FF00);

  message.channel.send(embed);
}

export const help: HelpObj = {
  aliases: [],
  category: 'Tickets',
  desc: 'Creates a ticket.',
  usage: 'new',
  venom: true
};

export const clientPerms: PermissionString[] = [];

export const memberPerms: PermissionString[] = [];

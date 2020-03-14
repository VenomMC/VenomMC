import { VenomClient } from '../../structures/Client';
import { GuildMessage, HelpObj } from 'VenomBot';
import { MessageEmbed, PermissionString } from 'discord.js';

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  if (!args[1]) {
    const categories: { [ category: string ]: string[] } = {};
    Object.values(client.commands.categories).forEach(category => {
      categories[category] = client.commands.filter(cmd => cmd.help.category === category).keyArray();
    });
    const embed = new MessageEmbed()
      .setTitle('Commands List')
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setColor(0x00FF00);

    for (const category in categories) {
      if (Object.prototype.hasOwnProperty.call(categories, category)) {
        const output = categories[category].map(cmd => `- \`${client.config.prefix}${client.commands.findKey((c, key) => key === cmd)}\``);
        embed.addField(category, output.join('\n'), true);
      }
    }

    message.channel.send(embed);
  } else {
    const cmd = args[1].toLowerCase();
    if (!client.commands.has(cmd)) return message.reply(`:x: I did not find \`${client.escMD(cmd)}\` from my commands list.`);
    const info = client.commands.get(cmd)!.help;
    if (info.private && !client.config.owners.includes(message.author.id)) return message.reply(':x: Sorry, but that command is private.');

    const embed = new MessageEmbed()
      .setTitle(`${client.config.prefix + cmd} Command Info`)
      .addField('Description', info.desc, true)
      .addField('Usage', client.config.prefix + info.usage, true)
      .addField('Category', info.category, true)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      .setColor(0x00FF00);

    message.channel.send(embed);
  }
}

export const help: HelpObj = {
  aliases: [],
  category: 'Miscellaneous',
  desc: 'Displays the help menu.',
  usage: 'help [Command]'
};

export const clientPerms: PermissionString[] = [
  'EMBED_LINKS'
];

export const memberPerms: PermissionString[] = [];

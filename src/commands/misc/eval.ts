import { VenomClient } from '../../structures/Client';
import { inspect } from 'util';
import { GuildMessage, HelpObj } from 'VenomBot';
import { MessageEmbed, PermissionString } from 'discord.js';

function clean (text: any) {
  if (typeof text === 'string') {
    return text.replace(/`/g, '`\u200b');
  }

  return text;
}

export async function run (client: VenomClient, message: GuildMessage, args: string[]) {
  if (!client.config.owners.includes(message.author.id)) return message.reply(':x: Only the bot owners may use this command.');
  if (!message.channel.permissionsFor(client.user!)!.has('EMBED_LINKS')) return message.reply(':x: I am missing the required permission `Embed Links` in this channel.');

  const code = args.slice(1).join(' ');
  if (!code) return message.reply(':x: Give me code to evaluate nub');

  try {
    let evaled = await eval(`(async() => {${code}})();`);
    if (typeof evaled !== 'string') evaled = inspect(evaled);

    const embed = new MessageEmbed()
      .setAuthor('Evaluation')
      .setTitle('Output')
      .setDescription(`\`\`\`xl\n${clean(evaled).length <= 2038 ? clean(evaled) : 'Over 2048 Characters'}\n\`\`\``)
      .setColor(0x00FF00)
      .setTimestamp();
    message.channel.send(embed);
  } catch (e) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(e)}\n\`\`\``);
  }
}

export const help: HelpObj = {
  aliases: [ 'evaluate' ],
  category: 'Miscellaneous',
  desc: 'Evaluates code.',
  private: true,
  usage: 'eval <Code>'
};

export const clientPerms: PermissionString[] = [
  'EMBED_LINKS'
];

export const memberPerms: PermissionString[] = [];

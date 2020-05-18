import { GuildMessage } from 'VenomBot';
import { VenomClient } from '../structures/Client';

export async function run (client: VenomClient, message: GuildMessage) {
  if (!message.guild?.available) return;

  const automod = client.functions.automod(message);
  if (message.author.bot) return;
  if (!message.member.hasPermission('ADMINISTRATOR')) {
    switch (automod) {
      case 'flood':
        return message.delete();

      case 'ping':
        message.delete();
        return message.reply('Please do not ping owners.');

      // no default
    }
  }

  if (message.content.toLowerCase().includes('no u')) {
    if (client.nou[message.author.id]) client.nou[message.author.id] += 1;
    else client.nou[message.author.id] = 1;
  }

  if (message.guild.id === client.config.officialserver) client.functions.checkLOA(message);

  if ((/(?:https?:\/\/)?discord(?:app.com\/invite|.gg)\/[\w\d]+/gi).test(message.content) &&
    message.channel.permissionsFor(client.user!)!.has('MANAGE_MESSAGES') &&
    !client.config.bypasslink.includes(message.author.id) &&
    message.guild.id === client.config.officialserver) return message.delete();

  if (!message.content.startsWith(client.config.prefix) || message.content === client.config.prefix) return;

  const args = message.content.slice(client.config.prefix.length).split(/ +/g);
  let cmd: string | undefined = args[0].toLowerCase();

  cmd = client.commands.checkAlias(cmd);
  if (!cmd) return;

  const info = client.commands.get(cmd)!;
  if (info.help.private && !client.config.owners.includes(message.author.id)) return;
  if (info.help.venom && message.guild.id === client.config.officialserver) info.run(client, message, args);
  else if (info.help.staffonly && message.guild.id === client.config.staffserver) info.run(client, message, args);
  else if (!info.help.venom && !info.help.staffonly) info.run(client, message, args);
}

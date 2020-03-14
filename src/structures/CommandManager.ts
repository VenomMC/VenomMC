import { Collection } from 'discord.js';
import { Command } from 'VenomBot';
import { readdirSync } from 'fs';

export class CommandManager extends Collection<string, Command> {
  public constructor () {
    super();

    const categories = readdirSync('./dist/commands');
    categories.forEach(c => readdirSync(`./dist/commands/${c}`).forEach(cmd => {
      this.list.push(cmd.slice(0, -3));
      const command: Command = require(`../commands/${c}/${cmd}`); // eslint-disable-line @typescript-eslint/no-var-requires, global-require
      this.set(cmd.slice(0, -3), command);

      if (!Object.values(this.categories).includes(command.help.category)) this.categories[c] = command.help.category;
    }));
  }

  public categories: { [ rawCategory: string ]: string } = {};

  public checkAlias (cmd: string) {
    return this.findKey((c, key) => key === cmd || c.help.aliases.includes(cmd));
  }

  public list: string[] = [];
}

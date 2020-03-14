import { Collection } from 'discord.js';
import { Command } from 'VenomBot';

export class CommandManager extends Collection<string, Command> {
  public categories: { [ rawCategory: string ]: string } = {};

  public checkAlias (cmd: string) {
    return this.findKey((c, key) => key === cmd || c.help.aliases.includes(cmd));
  }
}

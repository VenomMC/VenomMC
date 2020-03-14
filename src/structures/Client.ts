import * as config from '../config.json';
import { CommandManager } from './CommandManager';
import { Functions } from './Functions';
import { Pool } from 'pg';
import { Client, Util } from 'discord.js';

const pool = new Pool();

export class VenomClient extends Client {
  public commands = new CommandManager();

  public config = config;

  public escInline = (str: string) => str.replace(/`/g, '\u200B`\u200B');

  public escMD = Util.escapeMarkdown;

  public functions = new Functions();

  public nou: { [ id: string ]: number } = {};

  public query = pool.query.bind(pool);

  public sql = pool;
}

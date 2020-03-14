/* eslint-disable @typescript-eslint/no-var-requires, global-require */

import { Command } from 'VenomBot';
import { VenomClient } from './structures/Client';
import { config } from 'dotenv';
import { readdirSync } from 'fs';

config();

const client = new VenomClient({
  disableMentions: 'everyone'
});

const categories = readdirSync('./dist/commands');
categories.forEach(c => readdirSync(`./dist/commands/${c}`).forEach(cmd => {
  const command: Command = require(`../commands/${c}/${cmd}`);
  client.commands.set(cmd.slice(0, -3), command);

  if (!Object.values(client.commands.categories).includes(command.help.category)) client.commands.categories[c] = command.help.category;
}));

readdirSync('./dist/events').forEach(event => client.on(event.slice(0, -3), (...args) => require(`./events/${event}`).run(client, ...args)));

client.login(process.env.BOT_TOKEN);

process.on('unhandledRejection', console.log);

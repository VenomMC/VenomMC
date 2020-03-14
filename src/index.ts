/* eslint-disable global-require */

import { VenomClient } from './structures/Client';
import { config } from 'dotenv';
import { readdirSync } from 'fs';

config();

const client = new VenomClient({
  disableMentions: 'everyone'
});
readdirSync('./dist/events').forEach(event => client.on(event.slice(0, -3), (...args) => require(`./events/${event}`).run(client, ...args)));

client.login(process.env.BOT_TOKEN);

process.on('unhandledRejection', console.log);

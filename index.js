/* eslint-disable global-require */

require('dotenv').config();

const { Pool } = require('pg');
const pool = new Pool();

const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
client.config = require('./config.json');
client.Discord = Discord;
client.escMD = Discord.Util.escapeMarkdown;
client.fetch = require('node-fetch');
client.nou = {};
client.query = pool.query.bind(pool);

client.categories = fs.readdirSync('./commands');
client.commands = new Discord.Collection();
client.functions = new Discord.Collection();

client.cmdList = {};
client.eventList = fs.readdirSync('./events').filter(f => f.endsWith('.js'));
client.fnList = fs.readdirSync('./functions').filter(f => f.endsWith('.js'));

client.categories.forEach(category => fs.readdirSync(`./commands/${category}`).forEach(cmd => client.commands.set(cmd.slice(0, -3), require(`./commands/${cmd}`))));
client.fnList.forEach(fn => client.functions.set(fn.slice(0, -3), require(`./functions/${fn}`)));
client.eventList.forEach(event => client.on(event.slice(0, -3), (...args) => require(`./events/${event}`).run(client, ...args)));

client.login(process.env.BOT_TOKEN);

process.on('unhandledRejection', console.log);

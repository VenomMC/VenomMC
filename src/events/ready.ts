import { VenomClient } from '../structures/Client';
import fetch from 'node-fetch';
import { schedule } from 'node-cron';

async function setActivity (client: VenomClient) {
  let name = null;
  let json = await fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } }).then(res => res.json());
  if (!json.joke) name = 'Dad API Unavailable';
  else name = json.joke;
  client.user!.setActivity(`${name} | ${client.config.prefix}help`);
  setInterval(async () => {
    json = await fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } }).then(res => res.json());
    if (!json.joke) name = 'Dad API Unavailable';
    else name = json.joke;
    client.user!.setActivity(`${name} | ${client.config.prefix}help`);
  }, 1000 * 60 * 10);
}

function setCron (client: VenomClient) {
  const guild = client.guilds.cache.get(client.config.officialserver);
  if (!guild) return;

  schedule('0 0 * * Sunday', async () => {
    const { rows } = await client.query('SELECT * FROM pending');
    client.query('DELETE FROM pending');

    if (!guild.me!.hasPermission('MANAGE_ROLES')) return;

    const pending = guild.roles.cache.find(r => r.name === 'Pending');
    if (!pending) return;
    if (guild.me!.roles.highest.comparePositionTo(pending) <= 0) return;

    const staff = guild.roles.cache.get(client.config.staffrole);
    if (!staff) return;
    if (guild.me!.roles.highest.comparePositionTo(staff) <= 0) return;

    const helper = guild.roles.cache.find(r => r.name === 'Staff');
    if (!helper) return;
    if (guild.me!.roles.highest.comparePositionTo(helper) <= 0) return;

    for (const row of rows) {
      const member = await guild.members.fetch(row.userid).catch(() => null);
      if (!member) return;
      member.setNickname(`Helper | ${member.displayName}`);
      if (member.roles.cache.has(pending.id)) member.roles.remove(pending);
      if (!member.roles.cache.has(staff.id)) member.roles.add(staff);
      if (!member.roles.cache.has(helper.id)) member.roles.add(helper);
    }
  }, {
    timezone: 'America/New_York'
  });
}

export async function run (client: VenomClient) {
  console.log(`Successfully signed in as ${client.user!.tag}. (ID ${client.user!.id})`);

  setActivity(client);
  setCron(client);
}

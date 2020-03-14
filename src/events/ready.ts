import { VenomClient } from '../structures/Client';
import fetch from 'node-fetch';

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

export async function run (client: VenomClient) {
  console.log(`Successfully signed in as ${client.user!.tag}. (ID ${client.user!.id})`);

  setActivity(client);
}

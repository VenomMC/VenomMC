function checkStream (client) {
  const member = client.guilds.get(client.config.officialserver).members.get(client.config.owners[0]);

  return setInterval(() => {
    const activity = member.presence.activities.find(a => a.type === 'STREAMING');

    if (client.user.presence.activities[0].type !== 'STREAMING' && activity) {
      return client.user.setActivity(`${activity.name}`, {
        type: 'STREAMING',
        url: 'https://www.twitch.tv/tmx_cryptic'
      });
    } else if (client.user.presence.activities[0].type === 'STREAMING' && !activity) {
      return client.user.setActivity('you', { type: 'WATCHING' });
    }

    return undefined;
  }, 10000);
}

async function setActivity (client) {
  let name = null;
  let json = await client.fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } }).then(res => res.json());
  if (!json.joke) name = 'Dad API Unavailable';
  else name = json.joke;
  client.user.setActivity(`${name} | ${client.config.prefix}help`);
  setInterval(async () => {
    if (client.user.presence.activity.type === 'STREAMING') return;

    json = await client.fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } }).then(res => res.json());
    if (!json.joke) name = 'Dad API Unavailable';
    else name = json.joke;
    client.user.setActivity(`${name} | ${client.config.prefix}help`);
  }, 1000 * 60 * 10);
}

module.exports.run = client => {
  console.log(`Successfully signed in as ${client.user.tag}.`);
  client.timeout = setTimeout(() => client.user.setStatus('idle'), 1000 * 60 * 5);

  checkStream(client);
  setActivity(client);
};

const activities = {
  dadjoke: 'PLAYING'
};

function checkStream (client) {
  const member = client.guilds.first().members.get(client.config.owners[0]);

  return setInterval(() => {
    const isStreaming = member.presence.activity ? member.presence.activity.type === 'STREAMING' : false;

    if (client.user.presence.activity.type !== 'STREAMING' && isStreaming) {
      return client.user.setActivity(`${member.presence.activity.name}`, {
        type: 'STREAMING',
        url: 'https://www.twitch.tv/tmx_cryptic'
      });
    } else if (client.user.presence.activity.type === 'STREAMING' && !isStreaming) {
      return client.user.setActivity('you', { type: 'WATCHING' });
    }

    return undefined;
  }, 10000);
}

function setActivity (client) {
  let step = 1;
  client.user.setActivity(`${Object.keys(activities)[0]} | ${client.config.prefix}help`, { type: Object.values(activities)[0] });
  setInterval(async () => {
    if (client.user.presence.activity.type === 'STREAMING') return;

    let name = Object.keys(activities)[step];
    if (name === 'dadjoke') {
      const json = await client.fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } }).then(res => res.json());
      if (!json.joke) name = 'Dad API Unavailable';
      else name = json.joke;
    }
    client.user.setActivity(`${name} | ${client.config.prefix}help`, { type: activities[name] });
    if (step === Object.keys(activities).length - 1) step = 0; // eslint-disable-line require-atomic-updates
    else step += 1; // eslint-disable-line require-atomic-updates
  }, 1000 * 60 * 10);
}

module.exports.run = client => {
  console.log(`Successfully signed in as ${client.user.tag}.`);
  client.timeout = setTimeout(() => client.user.setStatus('idle'), 1000 * 60 * 5);

  checkStream(client);
  setActivity(client);
};

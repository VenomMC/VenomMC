const activities = {
  'you': 'WATCHING',
  '<users> Users': 'WATCHING',
  'Jyguy at School': 'WATCHING',
  'Cat Videos': 'WATCHING',
  'People': 'WATCHING',
  'Anime': 'WATCHING',
  'my screen': 'WATCHING',
  'with my cats': 'PLAYING',
  'being AFK': 'PLAYING'
};

function checkStream(client) {
  const member = client.guilds.first().members.get(client.config.owners[0]);

  return setInterval(() => {
    const isStreaming = member.presence.activity.type === 'STREAMING';

    if (client.user.presence.activity.type !== 'STREAMING' && isStreaming) {
      return client.user.setActivity(`${member.presence.activity.name}`, {
        type: 'STREAMING',
        url: 'https://www.twitch.tv/tmx_cryptic'
      });
    } else if (client.user.presence.activity.type === 'STREAMING' && !isStreaming) {
      return client.user.setActivity('you', { type: 'WATCHING' });
    }
  }, 10000);
}

async function dmOwners(client) {
  return client.config.owners.forEach(async id => {
    const user = await client.users.fetch(id).catch(() => null);
    if (!user) return;
    user.send('New build finished :white_check_mark:');
  });
}

function setActivity(client) {
  let step = 1;
  client.user.setActivity(`${Object.keys(activities)[0]} | ${client.config.prefix}help`, { type: Object.values(activities)[0] });
  setInterval(() => {
    if (client.user.presence.activity.type === 'STREAMING') return;

    const name = Object.keys(activities)[step];
    client.user.setActivity(`${name.replace('<users>', client.users.size)} | ${client.config.prefix}help`, { type: activities[name] });
    if (step === Object.keys(activities).length - 1) step = 0;
    else step += 1;
  }, 1000 * 60 * 10);
}

module.exports.run = client => {
  return client.once('ready', () => {
    console.log(`Successfully signed in as ${client.user.tag}.`);
    client.timeout = setTimeout(() => client.user.setStatus('idle'), 1000 * 60 * 5);

    checkStream(client);
    dmOwners(client);
    setActivity(client);
  });
};

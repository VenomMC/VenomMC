async function setActivity (client) {
  let name = null;
  let json = await client.fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } }).then(res => res.json());
  if (!json.joke) name = 'Dad API Unavailable';
  else name = json.joke;
  client.user.setActivity(`${name} | ${client.config.prefix}help`);
  setInterval(async () => {
    json = await client.fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } }).then(res => res.json());
    if (!json.joke) name = 'Dad API Unavailable';
    else name = json.joke;
    client.user.setActivity(`${name} | ${client.config.prefix}help`);
  }, 1000 * 60 * 10);
}

module.exports.run = client => {
  console.log(`Successfully signed in as ${client.user.tag}.`);
  client.timeout = setTimeout(() => client.user.setStatus('idle'), 1000 * 60 * 5);

  setActivity(client);
};

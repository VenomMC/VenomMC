module.exports.run = client => {
  return client.on('ready', () => {
    console.log(`Successfully signed in as ${client.user.tag}.`);

    client.timeout = setTimeout(() => client.user.setStatus('idle'), 1000 * 60 * 5);

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
    let step = 1;
    client.user.setActivity(Object.keys(activities)[0], { type: Object.values(activities)[0] });
    setInterval(() => {
      const name = Object.keys(activities)[step];
      client.user.setActivity(name.replace('<users>', client.users.size), { type: activities[name] });
      if (step === activities.length - 1) step = 0;
      else step += 1;
    }, 1000 * 60 * 10);
  });
};

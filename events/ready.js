module.exports.run = client => {
  return client.on('ready', () => {
    console.log(`Successfully signed in as ${client.user.tag}.`);
    const channel = client.channels.find(c => c.name === 'staff-chat' && c.type === 'text');
    if (channel && channel.permissionsFor(client.user).has(['VIEW_CHANNEL', 'SEND_MESSAGES'])) channel.send('New build finished :white_check_mark:');

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
      client.user.setActivity(`${name.replace('<users>', client.users.size)} | ${client.config.prefix}help`, { type: activities[name] });
      if (step === Object.keys(activities).length - 1) step = 0;
      else step += 1;
    }, 1000 * 60 * 10);
  });
};

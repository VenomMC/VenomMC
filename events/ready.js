module.exports.run = (client) => {
  return client.on('ready', () => {
    console.log(`Successfully signed in as ${client.user.tag}.`);

    const activities = [
      'you',
      '<users> Users'
    ];
    let step = 0;
    setInterval(() => {
      if (step === activities.length) step === 0;
      client.user.setActivity(activities[step].replace('<users>', client.users.size), { type: 'WATCHING' });
      step += 1;
    }, 1000 * 60 * 10);
  });
};

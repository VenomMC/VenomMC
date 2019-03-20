module.exports.run = (client) => {
  return client.on('ready', () => {
    console.log(`Successfully signed in as ${client.user.tag}.`);
    return client.user.setActivity(`${client.guilds.size} Servers`);
  });
};

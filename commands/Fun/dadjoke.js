module.exports.run = async (client, message, args) => {
  const json = await client.fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } }).then(res => res.json());
  if (!json.joke) return message.reply(':x: The dad joke API seems to be down.');
  return message.channel.send(json.joke);
};

module.exports.help = {
  category: 'Fun',
  desc: 'Tells you a dad joke.',
  usage: 'dadjoke'
};

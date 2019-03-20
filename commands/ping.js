module.exports.run = async (client, message, args) => {
  const msg = await message.channel.send(`Pong! :heartbeat: \`${Math.round(client.ws.ping)}ms\``);
  return msg.edit(`${msg.content} :stopwatch: \`${Date.now() - msg.createdTimestamp}ms\``);
};

module.exports.run = client => {
  return client.on('error', console.error);
};

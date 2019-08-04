module.exports.run = client => {
  return process.on('unhandledRejection', console.log);
};

let arr = [];

module.exports.run = message => {
  if (arr[0] === message.author.id) {
    if (arr[1] >= 8) return 'flood';
    arr[1] += 1;
  } else arr = [ message.author.id, 1 ];

  return false;
};

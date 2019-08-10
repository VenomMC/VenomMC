module.exports.run = (client, oldState, newState) => {
  if (oldState.id === client.user.id) {
    if (client.leaveTimer) {
      clearTimeout(client.leaveTimer);
      client.leaveTimer = null;
    }
    return;
  }

  if (oldState && !newState) {
    if (oldState.channel.members.size === 1) {
      client.leaveTimer = setTimeout(oState => {
        if (!oState.channel.members.has(client.user.id)) return;
        oState.channel.leave();
      }, 1000 * 60 * 5, oldState);
    }
  } else if (!oldState && client.leaveTimer) {
    clearTimeout(client.leaveTimer);
    client.leaveTimer = null;
  }
};

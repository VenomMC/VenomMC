module.exports.run = (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(':x: You require the permission `Administrator`.');

  const channels = message.guild.channels.filter(c => client.config.staffchannels.includes(c.id));
  if (channels.some(c => !c)) return message.reply(':x: 1 or more of the staff channels has gone missing. Please tell Spiget to recalibrate the IDs.');

  channels.forEach(c => c.overwritePermissions({
    permissionOverwrites: {
      id: '592498342307823616',
      deny: [ 'SEND_MESSAGES' ]
    }
  }));
  return message.channel.send('Successfully locked all the staff channels.');
};

module.exports.help = {
  desc: 'Locks all the staff channels.',
  usage: 'stafflock'
};

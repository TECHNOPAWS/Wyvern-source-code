const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'shell',
  run: async(client, message, args) => {
    toExec = args.join(' ')
    if(!toExec) return message.channel.send('There\'s nothing for me to execute!')

    require('child_process').exec(toExec , async(err, stdout, stderr) => {
      message.channel.send({
        embeds: [
          new MessageEmbed()
          .setTitle(`ok-doki`)
          .setDescription(`\`\`\`\n${stdout}\`\`\``)
        ]
      })
    })
  }
}
let prefix = `w!`

module.exports = {
  name: `messageCreate`,
  execute({ client, param: [message] }) {
    if(message.content.startsWith(prefix) && !message.author.bot) {
      let args = message.content.slice(prefix.length).trim().split(/ +/g)
      let commandName = args.shift().toLowerCase()
      if(!commandName) return;
      let command = client.commands.get(commandName)  || client.commands.find(cmd => cmd.aliases?.includes(commandName))
      if(!command) return;
      try {
        command.run(client, message, args)
      }
      catch (err) {
        // err
      }
    }  
  }
}
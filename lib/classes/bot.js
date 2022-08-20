const { Client, Collection } = require(`discord.js`)
const intents = [`GUILDS`,`GUILD_MESSAGES`, `GUILD_MEMBERS`]

class BotClient extends Client {
  constructor() {
    super({
      intents
    })
    this.commands = new Collection();
    this.on('messageCreate', (msg) => {
      if ((new RegExp(`<@(!)?${this.user.id}>`, 'g')).test(msg.content)) {
        this.emit('mention', msg)
      }
    })
  }

  start() {
    this.login(process.env.token)
  }
}

module.exports = BotClient;
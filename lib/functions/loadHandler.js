const { readdirSync } = require(`fs`);
async function loadHandler(client) {
  readdirSync(`./commands`).forEach((folder) => {
    readdirSync(`./commands/${folder}`).forEach((file) => {
      let command = require(`../../commands/${folder}/${file}`)

      client.commands.set(command?.name, command)
    })
  })
}

module.exports = loadHandler;
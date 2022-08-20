const { readdirSync } = require("fs");

async function loadEvents(client) {
  readdirSync(`./events`).forEach((eventFile) => {
    let event = require(`${process.cwd()}/events/${eventFile}`)

    client.on(event.name, (...parameter) => {
      event.execute({
        client,
        param: parameter
      }) 
    })
  })
}

module.exports = loadEvents;
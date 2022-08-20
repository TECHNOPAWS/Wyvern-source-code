const BaseClient = require(`./lib/classes/bot.js`);
const loadHandler = require(`./lib/functions/loadHandler.js`);
const loadEvents = require(`./lib/functions/loadEvents.js`);
const client = new BaseClient();

loadHandler(client);
loadEvents(client);
client.start();
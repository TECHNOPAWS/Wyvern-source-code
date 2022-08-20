let { MessageEmbed } = require(`discord.js`)
const stringify = require('json-stable-stringify');

function intercept (value) {
  console.log(value)
  return value
}

module.exports = {
  name: 'eval',
  aliases: [`evaluate`],
  run: async (client, message, args) => {
    let toEval = args.join(" ").replaceAll(/console.log/gi, 'intercept')

    if (!toEval) return;
    if ((/process(.|\[)/).test(toEval)) return;
    try {
      let evaluated = await eval(toEval)
      if (stringify(evaluated, { space: '   ' }) === undefined) evaluated = 'No output';

      try {
        message.channel.send({
          embeds: [
            new MessageEmbed()
              .setTitle('Success')
              .setDescription(`${args.join(``)}`)
              .addField(`Output`, ` \`\`\`json\n${stringify(evaluated, { space: '   ' })}\`\`\``)
              .setColor('GREEN')
          ]
        })
      }
      catch {}
    } 
    catch (err) {

      message.reply({
      embeds: [
        new MessageEmbed()
        .setTitle(`An error occured`)
        .setDescription(`\`\`\`js\n${toEval}\n\`\`\``)
        .addField(`Error`, `\`\`\`js\n${err.stack.slice(0, 1000)}\n\`\`\``)
        .setColor(`RED`)
      ]
      });
    }
  },
};
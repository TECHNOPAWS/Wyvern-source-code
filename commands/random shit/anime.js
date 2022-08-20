// Because keita wants to rewrite his trash anime command
const axios = require('axios');
const { aniEmbed } = require('../../utils');
const { MessageSelectMenu, MessageEmbed, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'anime',
  run: async (_client, message, args) => {
    const query = args.join('+');
    const results = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${query}`);
    const animes = results.data.data

    const options = animes.map(anime => {
      const attr = anime.attributes;

      return {
        label: attr.canonicalTitle,
        description: `${attr.subtype.toUpperCase()} | ${attr.ageRating} ${attr.ageRatingGuide ?? ''}`,
        value: anime.id
      }
    })

    const embed = aniEmbed(animes[0])

    const menu = new MessageSelectMenu()
      .setCustomId('menu')
      .setPlaceholder('Not the right anime? Check here!')
      .addOptions(options)

    const msg = await message.channel.send({
      embeds: [embed],
      components: [
        new MessageActionRow().addComponents(menu)
      ]
    })
    const collector = msg.createMessageComponentCollector({ timer: 60000 })

    collector.on('collect', (i) => {
      if (i.user.id !== message.author.id) return;
      collector.resetTimer()
      i.update({
        embeds: [
          aniEmbed(animes.find(ani => ani.id == i.values[0]))
        ]
      })
    })
  }
}
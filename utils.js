const { MessageEmbed } = require('discord.js');

function normalise (text) {
  return text[0].toUpperCase() + text.substring(1).toLowerCase()
}

function aniEmbed (anime) {
  const attr = anime.attributes

  return new MessageEmbed()
    .setTitle(`${attr.canonicalTitle} | ${attr.showType.toUpperCase()}`)
    .setURL(anime.links.self)
    .setDescription(`${attr.synopsis}\n----`)
    .setThumbnail(`${!attr.posterImage ? ' ' : attr.posterImage.original}`)
    .addFields(
      {
        name: '⌛| Published',
        value: `${attr?.startDate ?? 'N/A'}`,
        inline: true
      },
      {
        name: '🌟| Rating',
        value: `${attr?.averageRating ?? '0'}/100`,
        inline: true
      },
      {
        name: '💽| Episodes',
        value: `${attr.episodeCount ?? 'N/A'}`,
        inline: true
      },
      {
        name: '🤔| Status',
        value: `${normalise(attr.status) ?? 'N/A'}`,
        inline: true
      },
      {
        name: '⌚| Duration',
        value: `${attr.episodeLength ?? 'N/A'} minutes`,
        inline: true
      },
      {
        name: '🏆| Rank',
        value: `#${attr.ratingRank ?? 'N/A'}`,
        inline: true
      }
    )
    .setFooter({ text: `ID: ${anime.id} | ${attr.ageRating}` })
    .setTimestamp()
}



exports.normalise = normalise
exports.aniEmbed = aniEmbed
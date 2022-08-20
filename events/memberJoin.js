const { MessageEmbed } = require(`discord.js`)
function suffix (num) {
  let suffix = ''
  const check = num.toString()
  if (check == '11') return `${check}th`
  check.endsWith('1') 
    ? suffix = 'st' :
  check.endsWith('2')
    ? suffix = 'nd' :
  check.endsWith('3')
    ? suffix = 'rd' :
  suffix = 'th'

  return check + suffix
}
module.exports = {
  name: `guildMemberAdd`,
  async execute({ client, param: [member] }) {
    if (!member.user.bot) {
      client.guilds.cache.get(`1007048260873109645`).channels.cache.get(`1007989127028940861`).send({
        embeds: [
          new MessageEmbed()
            .setTitle(`New dev!`)
            .setDescription(`Hello ${member}, welcome to ${member.guild.name}. Make sure to read <#1007048261745520692>.`)
            .addField(`Want to add your bot?`, `Head over to <#1007989095890436197> and make a ticket.`)
            .setColor(`GREEN`)
            .setThumbnail(member.guild.iconURL())
            .setAuthor({
              name: member.user.tag,
              iconURL: member.displayAvatarURL()
            })
            .setFooter({
              text: `You are our ${suffix(member.guild.memberCount)} member!`
            })
        ]
      })
    }
  }
}
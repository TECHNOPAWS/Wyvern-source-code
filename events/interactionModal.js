let fetch = require(`node-fetch`)
const { MessageEmbed, MessageButton, MessageActionRow } = require(`discord.js`)
module.exports = {
  name: `interactionCreate`,
  async execute({ client, param: [interaction] }) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === `informations`) {
      let id = interaction.fields.getTextInputValue(`bot-id`)
      let name = interaction.fields.getTextInputValue(`bot-name`)
      let token = interaction.fields.getTextInputValue(`bot-token`)
      let info = interaction.fields.getTextInputValue(`bot-purpose`)

      let fetchingUser = await fetch(`https://discord.com/api/v10/users/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bot ${client.token}`
        }
      })

      let fetchedUser = await fetchingUser.json()

      if (fetchedUser.code === 50035 || fetchedUser.code === 10013) return await interaction.update({
        content: `That doesn't seem to be a valid id.`,
        ephemeral: true,
        components: []
      })

      if (!fetchedUser.bot == true || !fetchedUser.bot) return await interaction.update({
        content: `Hmm.. that doesn't seem to be a bot, try again!`,
        components: [],
        ephemeral: true
      })


      if (name.toLowerCase() != `${fetchedUser.username.toLowerCase()}#${fetchedUser.discriminator}`) return await interaction.update({
        content: `Please insert the valid name of your bot.`,
        components: [],
        ephemeral: true
      })


      let tokenFetch = await fetch(`https://discord.com/api/v9/users/@me`, {
        method: `GET`,
        headers: {
          Authorization: `Bot ${token}`
        }
      })

      let tokenCheck = await tokenFetch.json()

      if (tokenCheck.message === `401: Unauthorized`) return await interaction.update({
        content: `Please provide a valid token.`,
        ephemeral: true,
        components: []
      })

      let ownerFetch = await fetch(`https://discord.com/api/v9/oauth2/applications/@me`, {
        method: `GET`,
        headers: {
          Authorization: `Bot ${token}`
        }
      })

      let ownerCheck = await ownerFetch.json()
      if (ownerCheck.owner.id !== interaction.user.id) return await interaction.update({
        content: `Ayo this isn't your bot, what you doing :face_with_raised_eyebrow:`,
        ephemeral: true,
        components: []
      })

      // If all systems go
      // Checks if a ticket already exists
      // If one already does, cancel operation
      if (interaction.guild.channels.cache.find(ch => ch.name === `${interaction.user.username.toLowerCase()}-${interaction.user.id}`)) {
        return await interaction?.update({
          content: 'You already have a ticket open!',
          components: [],
          ephemeral: true,
        });
      }

      // Otherwise create ticket channel in "ticket" catergory
      const ticket = await interaction.guild.channels.create(`${interaction.user.username.toLowerCase()}-${interaction.user.id}`, {
        parent: '1008018176702947338',
      });

      // Replies with channel
      interaction?.update({
        content: `Your request has been sent. Please wait for a dev to accept`,
        components: [],
        ephemeral: true,
      });

      // Send a message in ticket channel with the close button
      let closeButton = await ticket.send({
        //  content: `<@&1007280940898324480>`,
        embeds: [
          new MessageEmbed()
            .setTitle(`Ticket created!`)
            .setDescription(`This ticket has been made by ${interaction.guild.members.cache.find(m => m.id === ticket.name.split(`-`)[1]) ?? `A user that left the server.`}`)
            .setColor(`GREEN`)
            .addFields({
              name: `Invite link`,
              value: `[Click here to invite ${fetchedUser.username}#${fetchedUser.discriminator}](https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=8&scope=bot%20applications.commands)`
            }, {
              name: `Name`,
              value: `${fetchedUser.username}#${fetchedUser.discriminator}`
            }, {
              name: `User-ID`,
              value: id
            },
              {
              name: `Bot-info`,
              value: info
             })
        ],
        components: [
          new MessageActionRow()
            .addComponents([
              new MessageButton()
                .setLabel(`Close`)
                .setCustomId(`close`)
                .setStyle(`DANGER`)
            ])
        ]
      })
      //Create a collector
      let closeCollector = await closeButton.createMessageComponentCollector()

      closeCollector.on(`collect`, async (i) => {
        // Check if the interaction-user has the `bot-devs` role.
        if (!i.member.roles.cache.has(`1007280940898324480`)) return await i.reply({
          content: `Ayo, your not a bot dev!!!`,
          ephemeral: true
        })
        //Give user a role.
        
        let memberIdCheck = i.message.embeds[0].description.split(`<@`)[1]

        let memberId = memberIdCheck.slice(0, memberIdCheck.length - 1)

        const member = interaction.guild.members.cache.get(memberId)

        if (!member) return;
        await member.roles.add(`1008694054063718420`).then(async () => {
          try {
            let dm = await fetch(`https://discord.com/api/v9/users/@me/channels`, {
              method: `POST`,
              headers: {
                "Authorization": `Bot ${token}`, "Content-Type": "application/json"
              },
              body: JSON.stringify({
                recipient_id: ownerCheck.owner.id
              }),
            })

            let dmCreate = await dm.json();

            fetch(`https://discord.com/api/v9/channels/${dmCreate[`id`]}/messages`, {
              method: `POST`,
              headers: {
                "Authorization": `Bot ${token}`, "Content-Type": "application/json"
              },
              body: JSON.stringify({
                embeds: [
                  new MessageEmbed()
                    .setTitle(`Server added.`)
                    .setDescription(`I have been added to ${i.guild.name}.`)
                    .setColor(`GREEN`)
                    .setFooter({
                      text: `This is an automated message sent from ${i.guild.name}`
                    })
                ]
              })
            })

          } catch (err) {
            console.log(err)
          }
        })
        await i.channel.delete()
      })
    }
  }
}
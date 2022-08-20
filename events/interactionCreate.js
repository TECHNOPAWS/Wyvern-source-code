const { MessageActionRow, MessageButton, Modal, TextInputComponent } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute({ client, param: [interaction] }) {
    if (!interaction.isButton()) return;

    // Initation
    if (interaction.customId === 'ticket') {
      await interaction.reply({
        content: 'Are you sure you want to create a ticket?',
        components: [
          new MessageActionRow().addComponents([
            new MessageButton()
              .setLabel('Yes')
              .setCustomId('yes')
              .setStyle('SUCCESS')
              .setEmoji('👍'),
            new MessageButton()
              .setLabel('No')
              .setCustomId('no')
              .setStyle('DANGER')
              .setEmoji('👎'),
          ]),
        ],
        ephemeral: true,
      });
    }

    // Cancels ticket
    if (interaction.customId === 'no') {
      await interaction.update({
        content: 'Canceled!',
        components: [],
        ephemeral: true,
      });
    }

    // Starts ticket process
    if (interaction.customId === 'yes') {
      let modal = new Modal()
        .setTitle(`Informations`)
        .setCustomId(`informations`)
        .addComponents([
          new MessageActionRow()
            .addComponents([
              new TextInputComponent()
                .setLabel(`bot-ID`)
                .setPlaceholder(`Enter your bot's ID here!`)
                .setMaxLength(25)
                .setMinLength(16)
                .setCustomId(`bot-id`)
                .setStyle(`SHORT`)
                .setRequired(true)
            ]),
          new MessageActionRow()
          .addComponents([
            new TextInputComponent()
            .setLabel(`bot-name`)
            .setPlaceholder(`Enter your bots tag here. EX: testbot#1234`)
            .setMaxLength(45)
            .setMinLength(1)
            .setStyle(`SHORT`)
            .setRequired(true)
            .setCustomId(`bot-name`)
          ]),
          new MessageActionRow()
          .addComponents([
            new TextInputComponent()
            .setLabel(`bot-token`)
            .setPlaceholder(`Checks if you are the actual bot-owner`)
            .setMaxLength(82)
            .setMinLength(1)
            .setStyle(`SHORT`)
            .setRequired(true)
            .setCustomId(`bot-token`)
          ]),
            new MessageActionRow()
          .addComponents([
            new TextInputComponent()
            .setLabel(`bot-type`)
            .setPlaceholder(`What is your bot's main purpose? Elaborate`)
            .setMinLength(15)
            .setStyle(`PARAGRAPH`)
            .setRequired(true)
            .setCustomId(`bot-purpose`)
          ]),
        ])

      await interaction.showModal(modal)
    }
  },
};

const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
} = require('discord.js');

module.exports = {
	name: 'invite',
	description: 'Generates a invite link to a bot you mention!',
	run: async(client, message, args) => {

		const botUser = message.mentions.users.first() || client.users.cache.get(args[0]) || client.user;

		if (!botUser || !botUser.bot) return message.channel.send('Sorry can\'t generate a link, thats not a bot!');

		const btn = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel('Or click here!')
				.setStyle('LINK')
				.setURL(`https://discord.com/api/oauth2/authorize?client_id=${botUser.id}&permissions=983413288566&scope=bot%20applications.commands`),
		);
		const instant = new MessageEmbed().setAuthor({
			name: 'Your instant invite link has been generated!', iconURL: message.author.displayAvatarURL({
				dynamic: true,
			}),
		}).setDescription(`[CLICK HERE](https://discord.com/api/oauth2/authorize?client_id=${botUser.id}&permissions=983413288566&scope=bot%20applications.commands) to invite ${botUser}!`);

		message.channel.send({
			embeds: [instant],
			components: [btn],
		});
	},
};
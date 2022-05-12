const { Command } = require("reconlx")
const Discord = require('discord.js')

module.exports = new Command({
    name: `ticket-panel`,
    description: `Send's Ticket Panel In A Specific Channel`,
    userPermissions: ["MANAGE_GUILD"],
    options: [
        {
            name: 'channel',
            description: `Channel in which panel should be sent`,
            type: 'CHANNEL',
            required: true
        },
        {
            name: 'title',
            description: `Title Of The Ticket`,
            type: 'STRING',
            required: true
        }
    ],
    run: async({ interaction }) => {
        const channel = interaction.options.getChannel('channel')
        const title = interaction.options.getString('title')
        
        interaction.followUp({
            embeds: [
                new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`<:sh_tick:958961439853395988> **Sent The Ticket Panel in ${channel}**`)
            ],
            ephemeral: true
        })

        const ticketembed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`**Click On 📨 To Open A Ticket**`)
        .setTitle(`${title}`)
        .setTimestamp()
        .setFooter({
            text: `${client.user.username}`,
            iconURL: `${client.user.displayAvatarURL({dynamic: true})}`
        })
        const openbutton = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("t-cr")
            .setEmoji("📨")
            .setStyle("PRIMARY")
            .setLabel("OPEN A TICKET")
        )
        channel.send({embeds: [ticketembed], components: [openbutton]})
    }
})
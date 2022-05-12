const client = require("..");
const Discord = require('discord.js')
const simplydjs = require('simply-djs')
const transcript = require("discord-html-transcripts")
const premiumSchema = require('../Models/premiumSchema')
const mongoose = require('mongoose')
const Topgg = require("@top-gg/sdk")
const { cooldown } = require("../handlers/functions");
const { user } = require("..");
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
const title = require("../commands/Moderation/ticket");
client.on("interactionCreate", async (interaction) => {
  // Slash Command Handling
  if (interaction.isCommand()) {
    await interaction
      .deferReply({
        ephemeral: false,
      })
      .catch((e) => { });
    let prefix = "/";
    const cmd = client.commands.get(interaction.commandName);
    if (!cmd) return interaction.followUp({ content: "An error has occured " });

    
    

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );
    if (cmd) {
      if(cmd.voteOnly){
        const manager = new Topgg.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyNzA5MjExMzMxNTg2ODcxMyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjQ5NTE0MDgzfQ.cZ6MW0WNOF4-K66qQC4NePn4HVp1KwRhlwbNC0z7p0U")
        module.exports = manager;
        let vote = await manager.hasVoted(interaction.user.id)
        let bot = new MessageActionRow().addComponents(
          new MessageButton()
          .setStyle("LINK")
          .setURL("https://top.gg/bot/927092113315868713/vote")
          .setLabel(`Vote Me`)
        )

        if(!vote){
          return interaction.followUp({
            embeds: [
              new MessageEmbed()
              .setColor("BLUE")
              .setDescription(`<a:sh_nope:967120304130359407> **Hey ${interaction.user} Voting is Required to use this Command __[Vote Me Here](https://top.gg/bot/927092113315868713/vote)__ <:sh_vote:967119524346343495> **`)
              .setTitle(`Vote Required!`)
              .setFooter({
                text: `${client.user.username}`,
                iconURL:`${client.user.displayAvatarURL({dynamic: true})}`
              })
            ],
            components: [
              bot
            ]
          })
        }
      }
      // checking user perms
      if (!interaction.member.permissions.has(cmd.userPermissions || [])) {
        return interaction.followUp({
          embeds: [
            new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setDescription(`**You Don't Have \`\`${cmd.userPermissions}\`\` Permission to use this command**`)
          ]
        })
      } else if (
        !interaction.guild.me.permissions.has(cmd.botPermissions || [])
      ) {
        return client.embed(
          interaction,
          `I Don't Have \`${cmd.botPermissions}\` Permission to Use \`${cmd.name}\` Command!!`
        );
      } else if (cooldown(interaction, cmd)) {
        return client.embed(
          interaction,
          ` You are On Cooldown , wait \`${cooldown(
            interaction,
            cmd
          ).toFixed()}\` Seconds`
        );
      } 
      const buttons = new MessageActionRow().addComponents(
        new MessageButton()
        .setLabel("Get Premium")
        .setStyle("LINK")
        .setURL("https://discord.gg/aMsDhkgSuj")
        .setEmoji("<a:Sh_diamond:958298442659164170>"
        )
      )
      if(cmd.premium && !(await premiumSchema.findOne({
        User: interaction.user.id,
      })))

       

      return interaction.followUp({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("BLUE")
          .setDescription(`
<a:Sh_diamond:958298442659164170> __          **Hey ${interaction.user} You Must Have Premium To Access this Command!**__`)
          .addFields(
            {
              name: 'Get Premium Here',
              value: `**[Get Premium](https://discord.gg/aMsDhkgSuj)**`
            }
          )
        ], components: [buttons]
      })

      let owners = ["709169539249864775", "788745942777462794"];
      if(cmd.ownerOnly && interaction.user.id !== owners){
        return interaction.followUp({
          embeds: [
            new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`<a:sh_nope:967120304130359407> __**You Don't Have Access to This Command**__`)
          ]
        })
      }
      

      

      
      
        cmd.run({ client, interaction, args, prefix });
      
    }
  }

  
//Handling
  if(interaction.isButton()) {
    
    if(interaction.customId === "PRIMARY") {
      if(!interaction.member.roles.cache.has("930455066324918343"));
      await interaction.member.roles.add("930455066324918343")
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setDescription('``Premium Support``')
          .addFields(
            {
              name: 'Support Server',
              value: '[Kindly Join Support Server to Get Premium](https://discord.gg/aeop)',
            },
            {
              name: 'Why Premium',
              value: 'By Unlocking Premium U will Get Access To Special Commands + A Role In Support Server and Custom Response',
            },
            {
              name: 'Why We Introduced Premium',
              value: 'The one and only reason is to keep the bot in service + Store your data and give users a next level Experience Any Doubts? Join [Support Server](https://discord.gg/aeop)',
            }
          )
        ],
      ephemeral: true,});
    } else if (interaction.customId === "MALE") {
      if(!interaction.member.roles.cache.has("904053441419165748"));
      await interaction.member.roles.add("904053441419165748")
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setDescription(`<@${interaction.user.id}> You Were Given <@&904053441419165748> Role`)
        ],
      ephemeral: true})
    } else if (interaction.customId === "YT PING") {
      if(!interaction.member.roles.cache.has("930455066324918343"));
      await interaction.member.roles.add("930455066324918343")
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setDescription(`<@${interaction.user.id}> You Were Given The <@&930455066324918343> Role `)
        ],
      ephemeral: true})
    } else if (interaction.customId === "JS") {
      if(!interaction.member.roles.cache.has("941259469105549322"))
      await interaction.member.roles.add("941259469105549322")
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setDescription(`<@${interaction.user.id}> You were given the <@&941259469105549322> Role`)
        ],
      ephemeral: true})
    } else if (interaction.customId === "VERIFY") {
      if(!interaction.member.roles.cache.has("947540588448870431"));
      await interaction.member.roles.add("947540588448870431")
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setDescription(`<@${interaction.user.id}> You Have Been Verified! in ${interaction.guild.name} Congo!`)
        ],
      ephemeral: true})
    } else if(interaction.customId === "HELP MOD") {
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setColor(`ff0000`)
          .setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`)
          .setDescription(`\`ban\`,\`kick\`,\`mute\`,\`addrole\`,\`channel-clone\`,\`delrole\`,\`role\`,\`setnick\`,\`setrolename\`,\`sethoist\``)
          .setAuthor({
            name: `${interaction.user.tag}`,
            iconURL: `${interaction.user.avatarURL({dynamic: true})}`
          })
        ],
      ephemeral: true})
    } else if(interaction.customId === "UTILITY") {
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setThumbnail(`${interaction.user.displayAvatarURL({dynamic: true})}`)
          .setAuthor({
            name: `${interaction.user.tag}`,
            iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`
          })
          .setColor("#ff0000")
          .setDescription(`\`embed\`,\`calc\``)
        ],
      ephemeral: true})
    }
    if(interaction.customId === "INFO"){
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setColor(`ff0000`)
          .setTitle('INFO COMMANDS')
          .setThumbnail(`${interaction.user.displayAvatarURL({dynamic: true})}`)
          .setDescription(`\`help\`,\`ping\`,\`stats\`,\`avatar\`,\`serverinfo\`,\`userinfo\`,\`membercount\`,\`server-avatar\``)
        ],
      ephemeral: true})
    }
    if(interaction.customId === "FUN"){
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setColor(`ff0000`)
          .setThumbnail(`${interaction.user.displayAvatarURL({dynamic: true})}`)
          .setTitle(`FUN COMMANDS`)
          .setDescription(`\`calc\`,\`tictactoe\`,`)
        ],
      ephemeral: true})
    }
    if(interaction.customId === "DEV"){
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setColor(`ff0000`)
          .setDescription(`**Hey ${interaction.user} I am <@${client.user.id}> You Are Watching My Developer's Info
          
          I have been Developed in \`-\` Javascript/Discord.js
          
          My Developers Are \`-\`</Legend.js>#0001
          
          Node.js's Version \`-\` ${process.version}

          They Started Developing Me On \`-\` \`1/25/2022\`
          
          Discord.js's Version \`-\` ${Discord.version}**`)
          .setThumbnail(`${interaction.user.displayAvatarURL({dynamic: true})}`)
        ],
      ephemeral: true})
    }
    if(interaction.customId === "sr-role"){
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("AQUA")
          .addFields(
            {
              name: 'Total Roles',
              value: `${interaction.guild.roles.cache.size}`
            },
            {
              name: 'Highest Role',
              value: `${interaction.guild.roles.highest}`
            }
          )
        ]
      })
    }
    if(interaction.customId === "Ticket"){

      (await interaction.guild.channels.create(`Ticket-${interaction.user.id}`,{
        parent : "926373149606576159",
        permissionOverwrites : [
          {
            id: interaction.guild.roles.everyone,
            deny: ["VIEW_CHANNEL"]
          },
          {
            id: interaction.user.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS",]
          },
          {
            id: client.user.id,
            allow: ["MANAGE_CHANNELS"]
          },
          
        ],
        topic: `Ticket Number - ${interaction.user.id}`,
        reason: `Author - ${interaction.user.tag} Ticket number - ${interaction.user.id}`,
        rtcRegion: "india"
      }))
      interaction.reply({content: `Ticket Created At \`Ticket-${interaction.user.id}\``, ephemeral: true})
    } 
    else if(interaction.customId === "t-cr"){
      interaction.guild.channels.create(`Ticket - ${interaction.member.id}`,{
        type: "GUILD_TEXT",
        permissionOverwrites: [
          {
            id: interaction.guild.roles.everyone,
            deny: "VIEW_CHANNEL"
          },
          {
            id: interaction.user.id,
            allow: "VIEW_CHANNEL",
            deny: ["MANAGE_CHANNELS", "EMBED_LINKS", "ADD_REACTIONS", "MANAGE_MESSAGES"]
          },
        ],
        reason: `Ticket Opened By ${interaction.user.tag}`
      }).then(ch => {
        let embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`<:sh_tick:958961439853395988> **Created A Ticket ${ch}**`)
        interaction.reply({embeds: [embed], ephemeral: true})
        let button = new MessageActionRow().addComponents(
          new MessageButton()
          .setEmoji("🔒")
          .setCustomId("tc-cl")
          .setLabel(`Close Ticket`)
          .setStyle("SECONDARY")
          
        )
        let transcriptch = new MessageActionRow().addComponents(
          new MessageButton()
          .setCustomId("transcripts")
          .setStyle("PRIMARY")
          .setEmoji("📝")
          .setLabel(`Transcript`)
      )
         ch.send({
          embeds: [
            new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle(`Welcome`)
            .setDescription(`**Hey ${interaction.user} Welcome, 
            Staff will Be Soon here to Close The ticket Click on 🔒**`)
          ],
          content: `Welcome ${interaction.user}`,
          components: [button, transcriptch]
        })
        
        
      })
    }
    if(interaction.customId === "tc-cl"){
      interaction.channel.delete()
    }
    if(interaction.customId === "transcripts"){
      interaction.reply({
        embeds: [
          new MessageEmbed().setColor("BLUE").setDescription(`<:sh_tick:958961439853395988> Check Your Dm's Sent Transcript Of This Ticket`)
        ],
      ephemeral: true})
     const attachment =  await transcript.createTranscript(interaction.channel, {
       fileName: `${interaction.channel.name}.html`
      })
      interaction.user.send({files: [attachment], content: `Hey ${interaction.user}, Here's Your Transcript of ${interaction.channel}`})
    }
    
  }
  // Context Menu Handling
  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.commands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }
});

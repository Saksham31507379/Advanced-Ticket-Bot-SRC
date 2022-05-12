const { Client, MessageEmbed } = require("discord.js");
const fs = require("fs");
const ee = require(`../settings/config`).embed

/**
 *
 * @param {Client} client
 */

module.exports = async (client) => {
  try {
    client.arrayOfcommands = [];
    fs.readdirSync("./commands").forEach((cmd) => {
      let commands = fs
        .readdirSync(`./commands/${cmd}/`)
        .filter((file) => file.endsWith(".js"));
      for (cmds of commands) {
        let pull = require(`../commands/${cmd}/${cmds}`);
        if (pull.options) {
          pull.options
            .filter((g) => g.type === "SUB_COMMAND")
            .forEach((sub) => {
              client.subcmd.set(sub.name, sub);
            });
        }
        if (pull.name) {
          client.commands.set(pull.name, pull);
          client.arrayOfcommands.push(pull);
        } else {
          continue;
        }
      }
    });
    client.on("ready", async () => {
      try {
        await client.guilds.fetch().catch((e) => {});
        await client.guilds.cache.forEach(async (guild) => {
          await guild.commands
            .set(client.arrayOfcommands)
            .catch((e) => {
              console.log(e);
            });
        });
      } catch (e) {
        console.log(e);
      }
    });
    console.log(`${client.commands.size} Commands Loaded`);
  } catch (e) {
    console.log(e);
  }
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String} data
   */
  
};

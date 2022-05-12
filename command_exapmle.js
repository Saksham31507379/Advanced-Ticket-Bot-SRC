// slash command

const { Command } = require("../../utils/command/command");
const ee = require("../../settings/config").embed
const emoji = require("../../settings/config").emoji

module.exports = new Command({
  // options
  name: "",
  description: ``,
  userPermissions: [],
  botPermissions: [],
  category: "",
  cooldown: 10,
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
  },
});

// message command aka prefix cmd
const { Message, Client } = require("discord.js");
const ee = require("../../settings/config").embed
const emoji = require("../../settings/config").emoji

module.exports = {
  name: "",
  aliases: [""],
  description: ``,
  userPermissions: [],
  botPermissions: [],
  category: "",
  cooldown: 10,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    // code
  },
};

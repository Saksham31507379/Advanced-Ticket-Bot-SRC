const {
  Interaction,
  Collection,
  MessageActionRow,
  MessageButton,
  ButtonInteraction,
  CommandInteraction,
  Client,
} = require("discord.js");
const ee = require("../settings/config").embed;
const client = require("../index");

/**
 *
 * @param {Interaction} interaction
 * @param {Object} cmd
 */
function cooldown(interaction, cmd) {
  if (!interaction || !cmd) return;
  let { client, member } = interaction;
  if (!client.cooldowns.has(cmd.name)) {
    client.cooldowns.set(cmd.name, new Collection());
  }
  const now = Date.now();
  const timestamps = client.cooldowns.get(cmd.name);
  const cooldownAmount = cmd.cooldown * 1000;
  if (timestamps.has(member.id)) {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000; //get the lefttime
      //return true
      return timeLeft;
    } else {
      timestamps.set(member.id, now);
      setTimeout(() => timestamps.delete(member.id), cooldownAmount);
      return false;
    }
  } else {
    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    return false;
  }
}

/**
 *
 * @param {*} duration Number | Time in Milliseconds
 * @returns Object of Formatted Time in Days to milliseconds
 */
function parseDuration(duration) {
  let remain = duration;
  let days = Math.floor(remain / (1000 * 60 * 60 * 24));
  remain = remain % (1000 * 60 * 60 * 24);

  let hours = Math.floor(remain / (1000 * 60 * 60));
  remain = remain % (1000 * 60 * 60);

  let minutes = Math.floor(remain / (1000 * 60));
  remain = remain % (1000 * 60);

  let seconds = Math.floor(remain / 1000);
  remain = remain % 1000;

  let milliseconds = remain;

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}

/**
 *
 * @param {*} o Object of Time from days to nanoseconds/milliseconds
 * @param {*} useMilli Optional Boolean parameter, if it should use milliseconds or not in the showof
 * @returns Formatted Time
 */
function formatTime(o, useMilli = false) {
  let parts = [];
  if (o.days) {
    let ret = o.days + " Day";
    if (o.days !== 1) {
      ret += "s";
    }
    parts.push(ret);
  }
  if (o.hours) {
    let ret = o.hours + " Hr";
    if (o.hours !== 1) {
      ret += "s";
    }
    parts.push(ret);
  }
  if (o.minutes) {
    let ret = o.minutes + " Min";
    if (o.minutes !== 1) {
      ret += "s";
    }
    parts.push(ret);
  }
  if (o.seconds) {
    let ret = o.seconds + " Sec";
    if (o.seconds !== 1) {
      ret += "s";
    }
    parts.push(ret);
  }
  if (useMilli && o.milliseconds) {
    let ret = o.milliseconds + " ms";
    parts.push(ret);
  }
  if (parts.length === 0) {
    return "instantly";
  } else {
    return parts;
  }
}

/**
 *
 * @param {*} duration Number | Time in Millisceonds
 * @param {*} useMilli Optional Boolean parameter, if it should use milliseconds or not in the showof
 * @returns Formatted Time
 */
function duration(duration, useMilli = false) {
  let time = parseDuration(duration);
  return formatTime(time, useMilli);
}

function shuffle(a) {
  try {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  } catch (e) {
    console.log(String(e.stack));
  }
}

/**
 *
 * @param {CommandInteraction} interaction
 * @param {String[]} embeds
 * @returns
 */
async function swap_pages(interaction, embeds) {
  let currentPage = 0;
  let allbuttons = new MessageActionRow().addComponents([
    new MessageButton().setStyle("SECONDARY").setCustomId("0").setEmoji(`⏪`),
    new MessageButton().setStyle("PRIMARY").setCustomId("1").setEmoji(`◀️`),
    new MessageButton().setStyle("DANGER").setCustomId("2").setEmoji(`🗑`),
    new MessageButton().setStyle("PRIMARY").setCustomId("3").setEmoji(`▶️`),
    new MessageButton().setStyle("SECONDARY").setCustomId("4").setEmoji(`⏩`),
  ]);
  //Send message with buttons
  let swapmsg = await interaction.channel.send({
    embeds: [embeds[0]],
    components: [allbuttons],
  });
  //create a collector for the thinggy
  const collector = swapmsg.createMessageComponentCollector({
    time: 2000 * 60,
  });
  collector.on("collect", async (b) => {
    if (b.isButton()) {
      await b.deferUpdate().catch((e) => {});
      // page first
      if (b.customId == "0") {
        await b.deferUpdate().catch((e) => {});
        if (currentPage !== 0) {
          currentPage = 0;
          await swapmsg.edit({
            embeds: [embeds[currentPage]],
            components: [allbuttons],
          });
          await b.deferUpdate().catch((e) => {});
        }
      }
      //page forward
      if (b.customId == "1") {
        await b.deferUpdate().catch((e) => {});
        if (currentPage !== 0) {
          currentPage -= 1;
          await swapmsg.edit({
            embeds: [embeds[currentPage]],
            components: [allbuttons],
          });
          await b.deferUpdate().catch((e) => {});
        } else {
          currentPage = embeds.length - 1;
          await swapmsg.edit({
            embeds: [embeds[currentPage]],
            components: [allbuttons],
          });
          await b.deferUpdate().catch((e) => {});
        }
      }
      //go home
      else if (b.customId == "2") {
        try {
          allbuttons.components.forEach((btn) => btn.setDisabled(true));
          swapmsg.edit({
            embeds: [embeds[currentPage]],
            components: [allbuttons],
          });
        } catch (e) {}
      }
      //go forward
      else if (b.customId == "3") {
        if (currentPage < embeds.length - 1) {
          currentPage++;
          await swapmsg.edit({
            embeds: [embeds[currentPage]],
            components: [allbuttons],
          });
        } else {
          currentPage = 0;
          await swapmsg.edit({
            embeds: [embeds[currentPage]],
            components: [allbuttons],
          });
        }
      }
      // page last
      if (b.customId == "4") {
        currentPage = embeds.length - 1;
        await swapmsg.edit({
          embeds: [embeds[currentPage]],
          components: [allbuttons],
        });
      }
    }
  });

  collector.on("end", () => {
    allbuttons.components.forEach((btn) => btn.setDisabled(true));
    swapmsg.edit({ components: [allbuttons] });
  });
}

module.exports = {
  cooldown,
  parseDuration,
  formatTime,
  duration,
  shuffle,
  swap_pages,
};

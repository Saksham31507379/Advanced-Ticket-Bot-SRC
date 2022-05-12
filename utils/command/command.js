/**
 *
 * @param {import("./command").RunFunction} options
 */
const RunFunction = (options) => {};

class Command {
  /**
   *
   * @param {import("./command").CommandOptions} commandOptions
   */
  constructor(commandOptions) {
    Object.assign(this, commandOptions);
  }
}

module.exports = { Command };

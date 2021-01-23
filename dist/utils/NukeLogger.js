"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NukeLogger = void 0;
const chalk = require("chalk");
const messagePrefix = `${chalk.gray('[')}${chalk.magentaBright('NukeJS Bot Client')}${chalk.gray(']')}`;
class NukeLogger {
    constructor() {
    }
    MALFORMED_COMMAND(path) {
        console.log(`${messagePrefix} ${chalk.redBright(`Malformed command at ${chalk.blueBright(path)}`)}`);
    }
    LOADED_COMMAND(command) {
        console.log(`${messagePrefix} Loaded command ${chalk.greenBright(command.name)}`);
    }
    REMOVED_COMMAND(command) {
        console.log(`${messagePrefix} ${chalk.redBright(`Removed Command ${chalk.blueBright(command)}`)}`);
    }
    LOG_COMMAND(commandName, userName, guildName) {
        console.log(`${messagePrefix} Command ${chalk.blueBright(commandName)} has been run by ${userName} in ${guildName}`);
    }
    LOADED_EVENT(eventFile) {
        console.log(`${messagePrefix} Loaded Event ${chalk.greenBright(eventFile)}`);
    }
    LOADED_INHIBITOR(inhibitor) {
        console.log(`${messagePrefix} Loaded Inhibitor ${chalk.greenBright(inhibitor)}`);
    }
}
exports.NukeLogger = NukeLogger;

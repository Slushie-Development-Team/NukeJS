"use strict";
/**
 *
 *   NukeJS -- A Discord Bot Framework
 *   Copyright (C) 2021 Nikan Roosta Azad
 *
 *                  This file is part of NukeJS.
 *
 *   NukeJS is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   NukeJS is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with NukeJS.  If not, see <https://www.gnu.org/licenses/>.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const discord = require("discord.js");
const chalk = require("chalk");
const messagePrefix = `${chalk.gray('[')}${chalk.magentaBright('NukeJS Bot Client')}${chalk.gray(']')}`;
class Client extends discord.Client {
    constructor(options) {
        super(options.discordOptions);
        this.InhibitorStore = new discord.Collection();
        this.commands = new discord.Collection();
        this.events = new discord.Collection();
        this.eventsFolder = options.eventsFolder || './events';
        this.readyMessage = options.readyMessage || 'I have been started with the name {username}';
        this.owner = options.owner || "";
        this.dev_ids = options.dev_ids || [];
        if (!this.dev_ids.includes(this.owner) && this.owner != "")
            this.dev_ids.push(this.owner);
        this.on('ready', function () {
            let msg = `${messagePrefix} ${this.readyMessage}`;
            msg = msg.split('{username}').join(chalk.greenBright(this.user.username));
            msg = msg.split('{usertag}').join(chalk.greenBright(this.user.tag));
            msg = msg.split('{userid}').join(chalk.greenBright(this.user.id));
            msg = msg.split('{guildcount}').join(chalk.greenBright(this.guilds.cache.size));
            if (msg.includes('{guilds}')) {
                let guilds = [];
                this.guilds.cache.each(guild => {
                    guilds.push(guild.name);
                });
                msg = msg.split('{guilds}').join(chalk.greenBright(guilds.join(chalk.redBright(','))));
            }
            console.log(msg);
        });
    }
    ;
}
exports.Client = Client;
function checkCommand(command) {
    const perms = discord.Permissions;
    try {
        perms.resolve(command.botPerms);
    }
    catch (err) {
        if (err instanceof RangeError)
            console.log(messagePrefix + ` BotPerms of ${chalk.blueBright(command.name)} invalid! Command ${chalk.blueBright(command.name)} will be skipped!`);
        return false;
    }
    try {
        perms.resolve(command.userPerms);
    }
    catch (err) {
        if (err instanceof RangeError)
            console.log(messagePrefix + ` UserPerms of ${chalk.blueBright(command.name)} invalid! Command ${chalk.blueBright(command.name)} will be skipped!`);
        return false;
    }
    return true;
}

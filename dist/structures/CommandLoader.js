"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLoader = void 0;
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
const discord_js_1 = require("discord.js");
const fs = require("fs");
const NukeLogger_1 = require("../utils/NukeLogger");
const Loader_1 = require("./Loader");
const discord_js_2 = require("discord.js");
const chalk = require("chalk");
class CommandLoader extends Loader_1.Loader {
    constructor(client, options = { directory: "./commands", prefix: "n>" }) {
        super(client, { directory: options.directory, extensions: options.extensions });
        this.Commands = new discord_js_1.Collection();
        this.Logger = new NukeLogger_1.NukeLogger();
        if (!options.prefix)
            throw new Error("Property <prefix> cannot be empty in commandLoaderOptions");
        this.directory = process.cwd() + "/" + options.directory;
        this.prefix = options.prefix;
        this.client = client;
        this.name = options.name || "";
        this.allowMention = options.allowMention || true;
        this.extensions = options.extensions || [".js", ".ts"];
        this.folderCategory = options.folderCategory || true;
        this.logCommands = options.logCommands || false;
        this.handleEditing = options.handleEditing || false;
        this.blockBot = options.blockBot || true;
        this.blockClient = options.blockClient || true;
        this.ignoreCooldown = options.ignoreCooldown || [client.owner];
        this.ignorePerms = options.ignorePerms || [];
        this.ignoredInhibitors = options.ignoredInhibitors || [];
        this.errorOutput = options.errorOutput || false;
        this.init();
    }
    init() {
        console.log(chalk.gray(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`));
        console.log(chalk.gray(`#         Loading commands with prefix: ${this.prefix}           #`));
        console.log(chalk.gray(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`));
        if (this.client.builtInCommands)
            this.privateFetch();
        this.fetchAll();
        console.log(chalk.gray(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n`));
        this.client.on("ready", () => {
            this.client.on("message", (message) => __awaiter(this, void 0, void 0, function* () {
                if (message.partial)
                    yield message.fetch();
                this.handle(message);
            }));
            if (this.handleEditing) {
                this.client.on("messageUpdate", (o, n) => __awaiter(this, void 0, void 0, function* () {
                    if (o.partial)
                        yield o.fetch();
                    if (n.partial)
                        yield n.fetch();
                    if (o.content === n.content)
                        return;
                    this.handle(n);
                }));
            }
        });
    }
    register(file, path, category) {
        try {
            const command = new (require(path))(file);
            if (this.folderCategory && category !== undefined)
                command.category = category;
            this.Commands.set(command.name, command);
            this.Logger.LOADED_COMMAND(command);
            this.emit("loaded", { path: command.file });
        }
        catch (err) {
            if (err instanceof TypeError) {
                this.Logger.MALFORMED_COMMAND(path);
                this.emit("malformed", { path: path });
            }
            else {
                console.error(err);
            }
        }
    }
    remove(command) {
        if (this.Commands.has(command)) {
            this.Commands.delete(command);
            this.Logger;
        }
        else {
            throw new Error("Command " + command + " was never registered!");
        }
    }
    checkInihibitors(message, cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                this.client.InhibitorStore.forEach((inhibitor) => __awaiter(this, void 0, void 0, function* () {
                    if (!this.ignoredInhibitors.includes(inhibitor.name)) {
                        if ((yield inhibitor.run(message, cmd, this.name)) === false) {
                            resolve(true);
                        }
                    }
                    else {
                        resolve(false);
                    }
                }));
                resolve(false);
            });
        });
    }
    handle(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let args;
            if (message.content.startsWith(this.prefix)) {
                args = message.content.substring(this.prefix.length).split(/ +/);
            }
            else if (this.allowMention && message.content.startsWith(`<@${this.client.user.id}>`)) {
                args = message.content.substring(`<@${this.client.user.id}>`.length).split(/ +/);
            }
            else if (this.allowMention && message.content.startsWith(`<@!${this.client.user.id}>`)) {
                args = message.content.substring(`<@!${this.client.user.id}>`.length).split(/ +/);
            }
            else
                return;
            if (args[0] === "" || args[0] === "")
                args.shift();
            if (args.join("") === "" || args.join("") === " " || args.join("") === undefined)
                return;
            if (this.blockBot && message.author.bot)
                return;
            if (this.blockClient && message.author.id == this.client.user.id)
                return;
            const command = args.shift().toLowerCase();
            const cmd = this.Commands.get(command) || this.Commands.find(cmd => cmd.aliases.includes(command));
            if (!cmd)
                return;
            // Inhibitor Check
            for (let inhibitorKey of this.client.InhibitorStore.keyArray()) {
                if (this.ignoredInhibitors.includes(inhibitorKey))
                    continue;
                if ((yield this.client.InhibitorStore.get(inhibitorKey).run(message, cmd, this.name)) === false)
                    return;
            }
            if (!cmd.runIn.includes(message.channel.type))
                return;
            if (cmd.cooldown > 0 && cmd.onCooldown.includes(message.author.id)) {
                message.reply("You need to wait " + cmd.cooldown / 1000 + " seconds before using this command again!");
                return;
            }
            try {
                if (message.channel.type !== "dm") {
                    if (cmd.botPerms.length != 0) {
                        if (!message.guild.member(message.client.user).hasPermission(cmd.botPerms)) {
                            message.reply(`Please make sure I have following perms! ${cmd.botPerms.join(', ')}`);
                            return;
                        }
                    }
                    if (cmd.userPerms.length != 0 && !this.ignorePerms.includes(message.author.id)) {
                        if (!message.member.hasPermission(cmd.userPerms)) {
                            message.reply(`You need following perms to use this command! ${cmd.userPerms.join(', ')}`);
                            return;
                        }
                    }
                }
                if (cmd.run)
                    yield cmd.run(message, args, message.client);
                else
                    yield cmd.exec(message, args, message.client);
                this.emit("executed", { command: cmd.name });
                if (this.logCommands)
                    this.Logger.LOG_COMMAND(cmd.name, message.user.username, message.guild.name);
                if (cmd.cooldown > 0) {
                    cmd.onCooldown.push(message.author.id);
                    setTimeout(function () {
                        const index = cmd.onCooldown.indexOf(message.author.id);
                        if (index > -1) {
                            cmd.onCooldown.splice(index, 1);
                        }
                    }, cmd.cooldown);
                }
            }
            catch (error) {
                console.error(error);
                if (this.errorOutput) {
                    let errorEmbed = new discord_js_2.MessageEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                        .setTitle("An Error has occurred!")
                        .setDescription("Command failed to with error:\n\n" + error.message)
                        .setColor("#ee110f");
                    message.channel.send(errorEmbed);
                }
                this.emit("error", { command: cmd.name, error: error, message: message });
            }
        });
    }
    privateFetch() {
        for (let file of fs.readdirSync(__dirname + '/../commands')) {
            const command = new (require(__dirname + '/../commands/'))(file.split(".")[0]);
            this.Commands.set(command.name, command);
            this.Logger.LOADED_COMMAND(command);
            this.emit("loaded", { path: command.file });
        }
    }
}
exports.CommandLoader = CommandLoader;

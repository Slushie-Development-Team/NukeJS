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
exports.Help = void 0;
const Command_1 = require("../types/Command");
const discord_js_1 = require("discord.js");
const moment = require("moment");
class Help extends Command_1.Command {
    constructor() {
        super('help', {
            name: "help",
            description: "View all available commands.",
            usage: "help"
        });
    }
    run(message, args, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let BaseEmbed = new discord_js_1.MessageEmbed()
                .setTitle("Commands")
                .setColor(process.env.COLOR || "RANDOM")
                .setDescription(`${client.description || ""}\n\nStarted on ${moment(client.readyAt).format(`MMMM Do @ hh:mm a`)}.\n${client.ws.ping.toFixed(2)}ms 🤖 ❤️ => 🔌 Response Time`);
            // @ts-ignore
            let commands = Array.from(client.commands.values());
            for (let command of commands.slice(0, 6)) {
                BaseEmbed.addField(command.name, `${command.description}\n\`Usage: ${client.prefix}${command.usage || command.name}\``);
            }
            let msg = yield message.channel.send(BaseEmbed);
            if (commands.length <= 6)
                return;
            try {
                Promise.all([msg.react('◀️'), msg.react('▶️')]);
            }
            catch (error) {
                throw error;
            }
            let minimumCommands = 0;
            msg.createReactionCollector((reaction, user) => user.id === message.author.id && ["◀️", "▶️"].includes(reaction.emoji.name))
                .on("collect", (reaction, user) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield reaction.users.remove(user);
                }
                catch (_a) { }
                if (reaction.emoji.name === "▶️") {
                    let cmds = commands.slice(minimumCommands + 6, minimumCommands + 12);
                    if (!cmds[0])
                        return;
                    minimumCommands += 6;
                    let embed = new discord_js_1.MessageEmbed(Object.assign(Object.assign({}, BaseEmbed), { fields: [] }));
                    for (let command of cmds) {
                        embed.addField(command.name, `${command.description}\n\`Usage: ${client.prefix}${command.usage || command.name}\``);
                    }
                    return yield msg.edit(embed);
                }
                ;
                if (reaction.emoji.name === "◀️") {
                    let cmds = commands.slice(minimumCommands - 6, minimumCommands - 12);
                    if (!cmds[0])
                        return;
                    minimumCommands -= 6;
                    let embed = new discord_js_1.MessageEmbed(Object.assign(Object.assign({}, BaseEmbed), { fields: [] }));
                    for (let command of cmds) {
                        embed.addField(command.name, `${command.description}\n\`Usage: ${client.prefix}${command.usage || command.name}\``);
                    }
                    return yield msg.edit(embed);
                }
            }));
        });
    }
}
exports.Help = Help;

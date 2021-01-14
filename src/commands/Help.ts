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

import { Command } from "../types/Command";
import { Guild, Message, MessageEmbed, MessageReaction } from "discord.js";
import * as moment from "moment";
import { Client } from "../client/Client";

export class Help extends Command {
    constructor() {
        super('help', {
            name: "help",
            description: "View all available commands.",
            usage: "help"
        });
    }

    async run(message: Message, args: Array<string>, client: Client) {
        let BaseEmbed = new MessageEmbed()
            .setTitle("Commands")
            .setColor(process.env.COLOR || "RANDOM")
            .setDescription(`**Bot Statistics**\n${client.guilds.cache.size} servers\n${Array.from(client.guilds.cache.values()).reduce((p: number, c: Guild) => c.memberCount + p, 0)} Users\n\nStarted at ${moment(client.readyAt).format(`MMMM Do @ hh:mm a`)}.\n${client.ws.ping.toFixed(2)}ms 🤖 ❤️ => 🔌 Response Time`);

        // @ts-ignore
        let commands: Array<Command> = Array.from(client.commands.values());
        for(let command of commands.slice(0, 20)) {
            BaseEmbed.addField(command.name, `${command.description}\n\`Usage: ${client.prefix}${command.usage || command.name}\``)
        }

        let msg = await message.channel.send(BaseEmbed)
        if(commands.length <= 20) return;

        try { Promise.all<MessageReaction>([msg.react('◀️'), msg.react('▶️')]) } catch (error) { throw error; }
        let minimumCommands = 0;
        msg.createReactionCollector((reaction, user) => user.id === message.author.id && ["◀️", "▶️"].includes(reaction.emoji.name))
        .on("collect", async (reaction, user) => {
            try {
                await reaction.users.remove(user)
            } catch { }
            if (reaction.emoji.name === "▶️") {
                let cmds: Array<Command> = commands.slice(minimumCommands + 20, minimumCommands + 40);
                if (!cmds[0]) return;

                minimumCommands += 20;
                let embed = new MessageEmbed({ ...BaseEmbed, fields: [] });

                for(let command of cmds) {
                    embed.addField(command.name, `${command.description}\n\`Usage: ${client.prefix}${command.usage || command.name}\``)
                }

                return await msg.edit(embed)
            };

            if (reaction.emoji.name === "◀️") {
                let cmds: Array<Command> = commands.slice(minimumCommands - 40, minimumCommands - 20);
                if (!cmds[0]) return;

                minimumCommands -= 40;
                let embed = new MessageEmbed({ ...BaseEmbed, fields: [] });

                for(let command of cmds) {
                    embed.addField(command.name, `${command.description}\n\`Usage: ${client.prefix}${command.usage || command.name}\``)
                }

                return await msg.edit(embed)
            }
        })
    }
}
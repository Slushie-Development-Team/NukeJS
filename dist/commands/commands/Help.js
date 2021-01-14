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

const Command = require("../types/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class Help extends Command {
    constructor() {
        super('help', {
            name: "help",
            description: "View all available commands.",
            usage: "help"
        });
    }

    /**
     * @param {import("discord.js").Message} message
     * @param {Array<string>} args
     * @param {import("../client/Client").Client} client
     */
    async run(message, args, client) {
        let embed = new MessageEmbed()
            .setTitle("Commands")
            .setColor(process.env.COLOR || "RANDOM");

        let commands = Array.from(client.commands.values());
        for(let command of commands.slice(0, 20)) {
            embed.addField(command.name, `\`${command.description}\`\nUsage: ${client.prefix}${command.usage || command.name}`)
        }

        return message.channel.send(embed)
    }
}
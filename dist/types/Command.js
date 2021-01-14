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
exports.Command = void 0;
class Command {
    constructor(file, options) {
        this.enabled = options.enabled;
        if (this.enabled === undefined)
            this.enabled = true;
        if (!this.enabled)
            return;
        this.runIn = options.runIn || ["text", "dm"];
        this.cooldown = Math.abs(options.cooldown) || 0;
        if (this.cooldown > 0)
            this.onCooldown = [];
        this.aliases = options.aliases || [];
        this.botPerms = options.botPerms || [];
        this.userPerms = options.userPerms || [];
        this.name = options.name || file.substring(0, file.length - 3);
        this.description = options.description || "";
        this.extendedHelp = options.extendedHelp || this.description;
        this.usage = options.usage || "";
        this.file = file;
    }
    /**
       * @param {Message} message The message that led to triggering this command
       * @param {Array<string>} args The args of the command
       * @param {client} client The client of the Bot
       */
    run(message, args, client) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     *
     * Alias of `NukeJS#Command.run()`
       * @param {Message} message The message that led to triggering this command
       * @param {Array<string>} args The args of the command
       * @param {client} client The client of the Bot
       *
       *
       */
    exec(message, args, client) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.Command = Command;

'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.InhibitorLoader = exports.EventLoader = exports.CommandLoader = exports.Inhibitor = exports.Event = exports.Command = exports.Client = void 0;
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
var Client_1 = require("./client/Client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return Client_1.Client; } });
var Command_1 = require("./types/Command");
Object.defineProperty(exports, "Command", { enumerable: true, get: function () { return Command_1.Command; } });
var Event_1 = require("./types/Event");
Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return Event_1.Event; } });
var Inhibitor_1 = require("./types/Inhibitor");
Object.defineProperty(exports, "Inhibitor", { enumerable: true, get: function () { return Inhibitor_1.Inhibitor; } });
var CommandLoader_1 = require("./structures/CommandLoader");
Object.defineProperty(exports, "CommandLoader", { enumerable: true, get: function () { return CommandLoader_1.CommandLoader; } });
var EventLoader_1 = require("./structures/EventLoader");
Object.defineProperty(exports, "EventLoader", { enumerable: true, get: function () { return EventLoader_1.EventLoader; } });
var InhibitorLoader_1 = require("./structures/InhibitorLoader");
Object.defineProperty(exports, "InhibitorLoader", { enumerable: true, get: function () { return InhibitorLoader_1.InhibitorLoader; } });

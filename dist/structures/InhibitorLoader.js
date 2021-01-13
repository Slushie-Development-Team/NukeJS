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
exports.InhibitorLoader = void 0;
const Loader_1 = require("./Loader");
const chalk = require("chalk");
const NukeLogger_1 = require("../utils/NukeLogger");
class InhibitorLoader extends Loader_1.Loader {
    constructor(client, options) {
        super(client, options);
        this.Logger = new NukeLogger_1.NukeLogger();
        this.init();
    }
    init() {
        console.log(chalk.gray(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`));
        console.log(chalk.gray(`#                          Inhibitor                             #`));
        console.log(chalk.gray(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`));
        this.fetchAll();
        console.log(chalk.gray(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n`));
    }
    register(file, path, category) {
        try {
            const inhibitor = new (require(path))(file);
            this.client.InhibitorStore.set(inhibitor.name, inhibitor);
            this.Logger.LOADED_INHIBITOR(path.substring(process.cwd().length + 1));
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.InhibitorLoader = InhibitorLoader;

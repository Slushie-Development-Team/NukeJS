"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
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
const index_1 = require("../index");
const EventEmitter = require('events');
const fs = require("fs");
class Loader extends EventEmitter {
    constructor(client, options) {
        super();
        if (!options.directory)
            throw new Error("Parameter <directory> cannot be empty in eventLoaderOptions");
        if (!(client instanceof index_1.Client))
            throw new Error("Argument <client> must be a NukeJS instance");
        this.directory = process.cwd() + "/" + options.directory;
        this.client = client;
        this.extensions = options.extensions || [".js", ".ts"];
    }
    init() { }
    register(file, path, category) { }
    fetchAll() {
        const files = fs.readdirSync(this.directory);
        files.forEach(file => {
            if (fs.lstatSync(this.directory + "/" + file).isDirectory()) {
                this.readDirRecursively(this.directory + "/" + file).forEach(subFile => {
                    this.register(subFile.split("/")[subFile.split("/").length - 1], subFile, file);
                });
            }
            else if (fs.lstatSync(this.directory + "/" + file).isFile()) {
                this.extensions.forEach(extension => {
                    if (file.endsWith(extension)) {
                        this.register(file, `${this.directory}/${file}`);
                    }
                });
            }
        });
    }
    remove(value) { }
    readDirRecursively(path) {
        const items = fs.readdirSync(path);
        let files = [];
        items.forEach(item => {
            if (fs.lstatSync(path + "/" + item).isFile()) {
                this.extensions.forEach(extension => {
                    if (item.endsWith(extension)) {
                        files.push(path + "/" + item);
                    }
                });
            }
            else if (fs.lstatSync(path + "/" + item).isDirectory()) {
                files.push(this.readDirRecursively(path + "/" + item));
            }
        });
        return files;
    }
}
exports.Loader = Loader;

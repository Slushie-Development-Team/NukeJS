"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLoader = void 0;
const NukeLogger_1 = require("../utils/NukeLogger");
const Loader_1 = require("./Loader");
const chalk = require("chalk");
class EventLoader extends Loader_1.Loader {
    constructor(client, options = { directory: "./events" }) {
        super(client, options);
        this.Logger = new NukeLogger_1.NukeLogger();
        this.init();
    }
    init() {
        console.log(chalk.gray(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`));
        console.log(chalk.gray(`#                           Events                               #`));
        console.log(chalk.gray(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`));
        this.fetchAll();
        console.log(chalk.gray(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n`));
    }
    register(file, path) {
        const event = new (require(path))(file);
        this.client.on(event.name, event.run);
        this.Logger.LOADED_EVENT(path.substring(process.cwd().length + 1));
    }
    remove(event) {
        if (this.events.has(event)) {
            this.events.delete(event);
            this.Logger;
        }
        else {
            throw new Error("event " + event + " was never registered!");
        }
    }
}
exports.EventLoader = EventLoader;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    category: 'EmbedDev',
    description: 'Envoi des messages Embed de développement',
    permissions: ['ADMINISTRATOR'],
    callback: ({ message, text }) => {
        const json = JSON.parse(text);
        const embed = new discord_js_1.MessageEmbed(json);
        return embed;
    }
};

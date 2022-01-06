import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'EmbedDev',
    description: 'Envoi des messages Embed de développement',

    permissions: ['ADMINISTRATOR'],

    callback: ({ message, text }) => {

        const json = JSON.parse(text)
        
        const embed = new MessageEmbed(json)

        return embed
    }
} as ICommand
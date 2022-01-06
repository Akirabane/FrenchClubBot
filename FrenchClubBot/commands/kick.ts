import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kick un membre',

    requireRoles: true,

    slash: 'both',
    testOnly: true,

    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <raison>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: ({ message, interaction, args }) => {

        const target = (message ? message.mentions.members?.first() : interaction.options.getMember('user')) as GuildMember

        if(!target) {
            return 'Vous devez mettre un pseudo valide.'
        }

        if(!target.kickable) {
            return {
                custom: true,
                content: 'Vous ne pouvez pas kick cette personne',
                ephemeral: true
            }
        }

        args.shift()
        const reason = args.join(' ')

        target.kick(reason)

        return {
            custom: true,
            content: `Vous avez kick <@${target.id}>`,
            ephemeral: true
        }    
    },
} as ICommand
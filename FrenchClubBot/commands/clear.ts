import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Permet de clear le chat.',

    requireRoles: true,

    maxArgs: 1,
    expectedArgs: '<amount>',
    
    slash: 'both',
    testOnly: true,

    callback: async ({ message, interaction, channel, args}) => {
        const amount = args.length ? parseInt(args.shift()!) : 10

        if (message) {
            await message.delete()
        }

        const messages = await channel.messages.fetch({ limit: 10 })
        const { size } = messages

        messages.forEach((message) => message.delete())

        const reply = `${size} messages ont été supprimés !`

        if (interaction) {
            return reply
        }

        channel.send(reply)
    }
} as ICommand
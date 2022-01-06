"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Configuration',
    description: 'Charge le changement de rôles',
    requireRoles: true,
    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],
    slash: 'both',
    testOnly: true,
    guildOnly: true,
    callback: ({ message, interaction, args }) => {
        const channel = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel'));
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Vous devez choisir un salon textuel.';
        }
        args.shift();
        const text = args.join(' ');
        channel.send(text);
        if (interaction) {
            interaction.reply({
                content: 'Envoyez un message !',
                ephemeral: true
            });
        }
    },
};

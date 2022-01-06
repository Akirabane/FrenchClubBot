"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Collector',
    description: 'Collection data',
    callback: ({ message, channel }) => {
        message.reply('Confirmez :');
        message.react('👍');
        message.react('✖');
        const filter = (reaction, user) => {
            return user.id === message.author.id;
        };
        const collector = message.createReactionCollector({
            filter,
            max: 1,
        });
        collector.on('collect', (reaction) => {
            console.log(reaction.emoji);
        });
        collector.on('end', collected => {
            if (collected.size === 0) {
                message.reply('Vous n\'avez pas répondu à la question !');
                return;
            }
            let text = 'Collécté:\n\n';
            collected.forEach((message) => {
                text += `"${message.emoji.name}"\n`;
            });
            message.reply(text);
        });
    },
};

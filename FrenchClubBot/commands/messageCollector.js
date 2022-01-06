"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Collector',
    description: 'Collection data',
    callback: ({ message, channel }) => {
        message.reply('Entrez une donnée :');
        const filter = (m) => {
            return m.author.id === message.author.id;
        };
        const collector = channel.createMessageCollector({
            filter,
            max: 1,
        });
        collector.on('collect', message => {
            console.log(message.content);
        });
        collector.on('end', collected => {
            if (collected.size === 0) {
                message.reply('Vous n\'avez pas répondu à la question !');
                return;
            }
            let text = 'Collécté:\n\n';
            collected.forEach((message) => {
                text += `${message.author.username} a répondu : `;
                text += `"${message.content}"\n`;
            });
            message.reply(text);
        });
    },
};

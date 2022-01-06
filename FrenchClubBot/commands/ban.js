"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Moderation',
    description: 'Bannir un membre',
    requireRoles: true,
    slash: 'both',
    testOnly: true,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <raison>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ message, interaction, args }) => {
        var _a;
        const target = (message ? (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first() : interaction.options.getMember('user'));
        if (!target) {
            return 'Vous devez mettre un pseudo valide.';
        }
        if (!target.bannable) {
            return {
                custom: true,
                content: 'Vous ne pouvez pas bannir cette personne',
                ephemeral: true
            };
        }
        args.shift();
        const reason = args.join(' ');
        target.ban({
            reason,
            days: 7,
        });
        return {
            custom: true,
            content: `Vous avez banni <@${target.id}>`,
            ephemeral: true
        };
    },
};

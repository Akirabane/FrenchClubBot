"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    category: 'Configuration',
    description: 'Ajoute un rôle',
    requireRoles: true,
    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<channel> <messageId> <role>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],
    slash: 'both',
    testOnly: true,
    guildOnly: true,
    init: (client) => {
        client.on('interactionCreate', interaction => {
            if (!interaction.isSelectMenu()) {
                return;
            }
            const { customId, values, member } = interaction;
            if (customId === 'auto_roles' && member instanceof discord_js_1.GuildMember) {
                const component = interaction.component;
                const removed = component.options.filter((options) => {
                    return !values.includes(options.value);
                });
                for (const id of removed) {
                    member.roles.remove(id.value);
                }
                for (const id of values) {
                    member.roles.add(id);
                }
                interaction.reply({
                    content: 'Vos rôles ont été mis à jour !',
                    ephemeral: true
                });
            }
        });
    },
    callback: ({ message, interaction, args, client }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const channel = (message ? message.mentions.channels.first() : interaction.options.getChannel('channel'));
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Vous devez choisir un salon textuel.';
        }
        const messageId = args[1];
        const role = (message ? message.mentions.roles.first() : interaction.options.getRole('role'));
        if (!role) {
            return 'Ce rôle n\'existe pas !';
        }
        const targetMessage = yield channel.messages.fetch(messageId, {
            cache: true,
            force: true
        });
        if (!targetMessage) {
            return 'ID de message inconnu.';
        }
        if (targetMessage.author.id !== ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id)) {
            return `Vous devez implémenter un ID de message correspondant à <@${(_b = client.user) === null || _b === void 0 ? void 0 : _b.id}>`;
        }
        let row = targetMessage.components[0];
        if (!row) {
            row = new discord_js_1.MessageActionRow();
        }
        const option = [{
                label: role.name,
                value: role.id
            }];
        let menu = row.components[0];
        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    return {
                        custom: true,
                        content: `Il y'a déjà le rôle : "<@${o.value}>" dans le menu.`,
                        allowedMentions: {
                            roles: [],
                        },
                        ephemeral: true,
                    };
                }
            }
            menu.addOptions(option);
            menu.setMaxValues(menu.options.length);
        }
        else {
            row.addComponents(new discord_js_1.MessageSelectMenu()
                .setCustomId('auto_roles')
                .setMinValues(0)
                .setMaxValues(1)
                .setPlaceholder('Choissiez vos rôles: ')
                .addOptions(option));
        }
        targetMessage.edit({
            components: [row]
        });
        return {
            custom: true,
            content: `Le rôle <@${role.id}> a bien été ajouté au menu !`,
            allowMentions: {
                roles: []
            },
            ephemeral: true,
        };
    }),
};

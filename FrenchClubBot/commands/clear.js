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
exports.default = {
    category: 'Moderation',
    description: 'Permet de clear le chat.',
    requireRoles: true,
    maxArgs: 1,
    expectedArgs: '<amount>',
    slash: 'both',
    testOnly: true,
    callback: ({ message, interaction, channel, args }) => __awaiter(void 0, void 0, void 0, function* () {
        const amount = args.length ? parseInt(args.shift()) : 10;
        if (message) {
            yield message.delete();
        }
        const messages = yield channel.messages.fetch({ limit: 10 });
        const { size } = messages;
        messages.forEach((message) => message.delete());
        const reply = `${size} messages ont été supprimés !`;
        if (interaction) {
            return reply;
        }
        channel.send(reply);
    })
};

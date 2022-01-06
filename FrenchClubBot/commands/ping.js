"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Testing bot',
    description: 'Répond Pong.',
    slash: true,
    testOnly: true,
    callback: ({}) => {
        return 'Pong';
    },
};

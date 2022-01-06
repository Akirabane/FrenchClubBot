import { ICommand } from 'wokcommands'

export default {
    category: 'Testing bot',
    description: 'Répond Pong.',
    
    slash: true,
    testOnly: true,

    callback: ({ }) => {
        return 'Pong'
    },
} as ICommand
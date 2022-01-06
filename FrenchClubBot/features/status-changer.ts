import { Client } from "discord.js";

export default (client: Client) => {
    const statusOptions = [
        'FrenchClub Bot',
        'do /help !',
        'made by AkirabaneVR',
        'try out features !'
    ]
    let counter = 0

    const updateStatus = () => {
        client.user?.setPresence({
            status: 'online',
            activities: [
                {
                    name: statusOptions[counter]
                }
            ]
        })

        if(++counter >= statusOptions.length) {
            counter = 0
        }

        setTimeout(updateStatus, 1000 * 5)
    }
    updateStatus()
}

export const config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Modification du status'
}
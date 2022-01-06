import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

import * as vrchat from 'vrchat'
import axios, { AxiosError } from 'axios'
import { SystemApi, UsersApi } from 'vrchat'

export default {
    category: 'Statistiques',
    description: 'Vous donne le nombre de joueurs et instances.',

    slash: true,
    testOnly: true,

    callback: async ({ }) => {
        
        const configuration: vrchat.Configuration = new vrchat.Configuration({
            username: "your_username",
            password: "your_pas",
            apiKey: "API",
            baseOptions: {
                headers: {
                    Cookie: 'apiKey=API'
                }
            }
        })

        const authApi: vrchat.AuthenticationApi = new vrchat.AuthenticationApi(configuration)
        const usersApi: vrchat.UsersApi = new vrchat.UsersApi(configuration)
        const worldsApi: vrchat.WorldsApi = new vrchat.WorldsApi(configuration)
        
        const FrenchClub = await worldsApi.getWorld("world id")
        
        const embed = new MessageEmbed()
            .setTitle(FrenchClub.data.name)
            .setColor("RANDOM")
            .setDescription("Voici les joueurs en ligne sur le FrenchClub !")
            .setAuthor(`Gérant actuel : ${FrenchClub.data.authorName}`)
            .setThumbnail(FrenchClub.data.thumbnailImageUrl)
            .addFields([
                {
                    name: 'Joueurs en ligne :',
                    value: `${FrenchClub.data.occupants} joueurs.`
                },
                {
                    name: 'Instance(s) créée(s):',
                    value: `${FrenchClub.data.instances?.length}.`
                },
                {
                    name: 'Joueurs en public :',
                    value: `${FrenchClub.data.publicOccupants} joueurs.`
                },
                {
                    name: 'Joueurs en privé :',
                    value: `${FrenchClub.data.privateOccupants} joueurs.`
                }
            ])
            .setFooter("Les informations sont synchronisées avec VRChat.\n")
            .setTimestamp()
        return embed

    },
} as ICommand
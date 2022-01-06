import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

import * as vrchat from 'vrchat'
import axios, { AxiosError } from 'axios'
import { SystemApi, UsersApi } from 'vrchat'

export default {
    category: 'Statistiques',
    description: 'Vous donne les informations techniques de la map.',

    slash: true,
    testOnly: true,

    callback: async ({ }) => {
        
        const configuration: vrchat.Configuration = new vrchat.Configuration({
            username: "your_username",
            password: "your_pass",
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
        
        const FrenchClub = await worldsApi.getWorld("world_ID")
        
        
        const embed = new MessageEmbed()
            .setTitle(FrenchClub.data.name)
            .setColor("RANDOM")
            .setDescription(`${FrenchClub.data.description}`)
            .setAuthor(`Gérant actuel : ${FrenchClub.data.authorName}`)
            .setThumbnail(FrenchClub.data.thumbnailImageUrl)
            .addFields([
                {
                    name: 'Date de création :',
                    value: `${FrenchClub.data.created_at}.`
                },
                {
                    name: 'Capacité par instance :',
                    value: `${FrenchClub.data.capacity}.`
                },
                {
                    name: 'Date de publication aux Labs :',
                    value: `${FrenchClub.data.labsPublicationDate}`
                },
                {
                    name: 'Date de sortie des Labs :',
                    value: `${FrenchClub.data.publicationDate}`
                }
            ])
            .setFooter("Les informations sont synchronisées avec VRChat.\n")
            .setTimestamp()
        return embed

    },
} as ICommand
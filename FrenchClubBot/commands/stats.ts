import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

import * as vrchat from 'vrchat'
import axios, { AxiosError } from 'axios'
import { SystemApi, UsersApi } from 'vrchat'

export default {
    category: 'Statistiques',
    description: 'Vous donne les statistiques du FrenchClub !',

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

        const FrenchClub = await worldsApi.getWorld("world_id")
        
        const embed = new MessageEmbed()
            .setTitle(FrenchClub.data.name)
            .setColor("RANDOM")
            .setDescription("Voici les statistiques actuelles de la map !")
            .setAuthor(`Gérant actuel : ${FrenchClub.data.authorName}`)
            .setThumbnail(FrenchClub.data.thumbnailImageUrl)
            .addFields([
                {
                    name: 'Visites total :',
                    value: `${FrenchClub.data.visits} joueurs.`,
                    inline: true
                },
                {
                    name: 'Tendance actuelle :',
                    value: `${FrenchClub.data.heat}/5 flammes.`,
                    inline: true
                },
                {
                    name: 'Favoris totaux :',
                    value: `${FrenchClub.data.favorites} favoris.`,
                    inline: true
                }
            ])
            .setFooter("Les informations sont synchronisées avec VRChat.\n")
            .setTimestamp()
        return embed

    },
} as ICommand
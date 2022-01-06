import DiscordJS, { Intents, Message, ReactionUserManager } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import * as vrchat from 'vrchat'
import axios, { AxiosError } from 'axios'
import { SystemApi, UsersApi } from 'vrchat'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
})

client.on('ready', async () => {
    console.log('FrenchBot is activated !')

    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        featureDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: ['your_id'],
        botOwners: ['your_id'],
        mongoUri: process.env.MONGO_URI,
        dbOptions: { 
            keepAlive: true,
         }
    })
})

const configuration: vrchat.Configuration = new vrchat.Configuration({
    username: "YourUsername",
    password: "YourPass",
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

let ready: Boolean = false

const init = async (): Promise<void> => {
    try {
      // Login VRChat API
      const { data } = await authApi.getCurrentUser()
      // Verify VRChat 2FA
      if (!data.displayName) {
        if (process.env.VRC_2FACODE && process.env.VRC_2FACODE.length > 0) {
          const { data } = await authApi.verify2FA({ code: process.env.VRC_2FACODE })
          if (!data.verified) {
            throw new Error('2FA code is invalid')
          } else {
            console.log('VRC API logged in.')
            ready = true
          }
        } else {
          throw new Error('VRC_2FACODE is required to login')
        }
      } else {
        console.log('VRC API logged in.')
        ready = true
      }
    } catch (error: unknown) {
      console.log('VRC API login Error.')
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError
        console.log(err.response?.data)
      } else {
        const err = error as Error
        console.log(err.message)
      }
    }
  }

  init()

client.login(process.env.TOKEN);

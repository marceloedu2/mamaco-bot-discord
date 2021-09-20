import { Client } from 'discord.js'
import * as fs from 'fs'
import path from 'path'

class DiscordBot {
  private static instance: DiscordBot

  private client: Client = new Client()

  private constructor() {
    this.initializeClient()
  }

  static getInstance(): DiscordBot {
    if (!DiscordBot.instance) {
      DiscordBot.instance = new DiscordBot()
    }
    return DiscordBot.instance
  }

  connect(): void {
    this.client
      .login(process.env.TOKEN)
      .then(_ => console.log('Discord Connected'))
      .catch(error =>
        console.error(`Could not connect. Error: ${error.message}`),
      )
  }

  private initializeClient(): void {
    if (!this.client) return

    this.setReadyHandler()
    this.setMessageHandler()
  }

  private setReadyHandler(): void {
    this.client.on('ready', () => {
      console.log(`${this.client.user.tag} Logged`)
    })
  }

  private setMessageHandler(): void {
    fs.readdir(path.join(__dirname, 'events'), (err, files) => {
      if (err) return console.error(err)
      console.log(files)

      files.forEach(async file => {
        const event = require(`./events/${file}`)
        const eventName = file.split('.')[0]

        this.client.on(eventName, event.bind(null, this.client))
      })
    })
  }
}

export default DiscordBot

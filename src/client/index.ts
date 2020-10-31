import { Client, Message } from 'discord.js'

const config = {
  prefix: '!',
}

export class DiscordBot {
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
      .then(_ => console.log('Connected to Discord'))
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
      console.log(`Logged in as ${this.client.user.tag}!`)
    })
  }

  private setMessageHandler(): void {
    this.client.on('message', async (message: Message) => {
      if (message.author.bot) return
      if (message.channel.type == 'dm') return
      if (
        !message.content.toLowerCase().startsWith(config.prefix.toLowerCase())
      )
        return
      if (
        message.content.startsWith(`<@!${this.client.user.id}>`) ||
        message.content.startsWith(`<@${this.client.user.id}>`)
      )
        return

      const args = message.content
        .trim()
        .slice(config.prefix.length)
        .split(/ +/g)
      const command = args.shift().toLowerCase()

      try {
        const commandFile = require(`../commands/${command}.js`)

        commandFile(this.client, message, args)
      } catch (err) {
        console.error('Erro:' + err)
      }
    })
  }
}

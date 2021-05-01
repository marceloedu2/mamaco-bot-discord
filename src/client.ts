import { Client, Message, MessageEmbed } from 'discord.js'
import * as fs from 'fs'

import commands from './config/commands'

const config = {
  prefix: '!',
}

class DiscordBot {
  private static instance: DiscordBot

  private client: Client = new Client()
  private queue = new Map()

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
  private setEventHandler(): void {
    fs.readdir('./src/events/', (err, files) => {
      if (err) return console.error(err)
      files.forEach(async file => {
        const event = require(`./events/${file}`)
        let eventName = file.split('.')[0]
        this.client.on(eventName, event.bind(null, this.client))
      })
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
        const commandObj = await commands.find(path => path.name === command)
        const commandPath = String(
          `./commands/${commandObj.group}/${commandObj.name}`,
        )
        const commandFile = require(commandPath)
        commandFile({ ...this.client, queue: this.queue }, message, args)
      } catch (err) {
        const msgErr = new MessageEmbed()
          .setColor('#FF0000')
          .setDescription('404 - Command not found')
        message.channel.send(msgErr).catch()
        console.error('Command erro:' + err)
      }
    })
  }
}

export default DiscordBot

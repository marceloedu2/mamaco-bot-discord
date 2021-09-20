import { MessageEmbed } from 'discord.js'

import commands from '../config/commands'

const config = {
  prefix: '!',
}

module.exports = async (client, message) => {
  if (message.author.bot) return

  if (message.channel.type === 'dm') return

  if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase()))
    return

  if (
    message.content.startsWith(`<@!${client.user.id}>`) ||
    message.content.startsWith(`<@${client.user.id}>`)
  )
    return

  const args = message.content.trim().slice(config.prefix.length).split(/ +/g)
  const command = args.shift().toLowerCase()

  try {
    const commandObj = await commands.find(path => path.name === command)
    const commandPath = String(
      `../commands/${commandObj.group}/${commandObj.name}`,
    )
    const commandFile = require(commandPath)
    commandFile({ ...client }, message, args)
  } catch (err) {
    console.error(err)
    const msgErr = new MessageEmbed()
      .setColor('#FF0000')
      .setDescription('❌ **404 - Command not found**')
    return message.channel.send(msgErr).catch()
  }
}

import Discord from 'discord.js'

import execute from './execute'
import list from './list'
import remove from './remove'
import skip from './skip'
import stop from './stop'

const queue: any = new Map()

const music = async (_, message, args) => {
  const serverQueue = queue.get(message.guild.id)
  serverQueue?.songs.forEach((x, i) => {
    if (i !== 0) {
      queue.push(x)
    }
  })

  if (
    !message.channel.name.toLowerCase().match(/music/) &&
    !message.channel.name.toLowerCase().match(/bot-test/)
  ) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`❌ **specific command for music channel**`)

    return message.channel.send(messageEmbed)
  } else if (
    (args[0].toLowerCase() === 'play' ||
      args[0].toLowerCase() === 'p' ||
      args[0].toLowerCase() === 'playlist' ||
      args[0].toLowerCase() === 'pl') &&
    args[1]
  ) {
    return execute(message, serverQueue, queue)
  } else if (
    args[0].toLowerCase() === 'next' ||
    args[0].toLowerCase().toLowerCase() === 'n'
  ) {
    return skip(message, serverQueue)
  } else if (
    args[0].toLowerCase() === 'stop' ||
    args[0].toLowerCase() === 's'
  ) {
    return stop(message, serverQueue)
  } else if (
    args[0].toLowerCase() === 'queue' ||
    args[0].toLowerCase() === 'q'
  ) {
    return list(message, serverQueue)
  } else if (
    args[0].toLowerCase() === 'remove' ||
    args[0].toLowerCase() === 'r'
  ) {
    return remove(message, serverQueue)
  } else {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription('❌ **You need to enter a valid command!**')

    return message.channel.send(messageEmbed)
  }
}

module.exports = music

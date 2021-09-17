import Discord from 'discord.js'

import execute from './execute'
import listMusics from './listMusics'
import remove from './remove'
import skip from './skip'
import stop from './stop'

const queue: any = new Map()

const music = async (_, message, args) => {
  const serverQueue = queue.get(message.guild.id)

  if (
    !message.channel.name.toLowerCase().match(/music/) &&
    !message.channel.name.toLowerCase().match(/bot-test/)
  ) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`❌ **specific command for music channel**`)

    return message.channel.send(messageEmbed)
  } else if ((args[0] === 'play' || args[0] === 'p') && args[1]) {
    return execute(message, serverQueue, queue)
  } else if (args[0] === 'next' || args[0] === 'n') {
    return skip(message, serverQueue)
  } else if (args[0] === 'stop' || args[0] === 's') {
    return stop(message, serverQueue)
  } else if (args[0] === 'queue' || args[0] === 'q') {
    return listMusics(message, serverQueue)
  } else if (args[0] === 'remove' || args[0] === 'r') {
    return remove(message, serverQueue)
  } else {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription('❌ **You need to enter a valid command!**')

    return message.channel.send(messageEmbed)
  }
}

module.exports = music

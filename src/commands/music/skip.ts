import Discord from 'discord.js'

import getRandomColor from '../../utils/getRandomColors'

const skip = (message, serverQueue) => {
  if (!message.member.voice.channel) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setDescription(
        '❌ **You have to be in a voice channel to stop the music!**',
      )

    return message.channel.send(messageEmbed)
  }

  if (!serverQueue) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setDescription('❌ **There is no song that I could skip!**')

    return message.channel.send(messageEmbed)
  }

  return serverQueue.connection.dispatcher.end()
}

export default skip

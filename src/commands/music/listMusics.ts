import Discord from 'discord.js'

import getRandomColor from '../../utils/getRandomColors'

const listMusics = (message, serverQueue) => {
  if (serverQueue?.songs.length > 0) {
    const queueList =
      serverQueue.songs.length > 0
        ? serverQueue.songs.map((song, index) => {
            return `**${index + 1}** - ${song.title}`
          })
        : []

    const messageEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setDescription(`🔈 **Music List** 📃\n${queueList.join('\n')}`)

    return message.channel.send(messageEmbed)
  } else {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`❌ **Empty music list** `)

    return message.channel.send(messageEmbed)
  }
}

export default listMusics

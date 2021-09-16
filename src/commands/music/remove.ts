import Discord from 'discord.js'

const remove = (message, serverQueue) => {
  const args = message.content.split(' ')
  const itemIndex = args[2] ? Number(args[2]) : null
  if (!message.member.voice.channel) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(
        '❌ **You have to be in a voice channel to remove the music!**',
      )

    return message.channel.send(messageEmbed)
  }

  if (!serverQueue) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription('❌ **There is no song that I could remove!**')

    return message.channel.send(messageEmbed)
  }

  if (!itemIndex) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription('❌ **Item to be removed not defined**')
    return message.channel.send(messageEmbed)
  }
  const itemRemoved = serverQueue.songs[itemIndex - 1]

  if (!itemRemoved) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription('❌ **Item does not exist in the list**')
    return message.channel.send(messageEmbed)
  }

  serverQueue.songs = serverQueue.songs.filter((_, index) => {
    return index + 1 !== Number(itemIndex)
  })

  if (serverQueue.songs.length <= 0) {
    serverQueue.connection.dispatcher.end()
  }

  const messageEmbed = new Discord.MessageEmbed()
    .setColor('#FF0000')
    .setDescription(`✅ **Item removed**: ${itemIndex} - ${itemRemoved.title}`)
  return message.channel.send(messageEmbed)
}

export default remove

import Discord from 'discord.js'

import getRandomColor from '../utils/getRandomColors'

export const sendMessage = (text: string, message: any) => {
  const messageEmbed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setTitle(text)

  if (message) {
    return message.channel.send(messageEmbed)
  } else {
    return messageEmbed
  }
}

export const sendMessageImage = (text: string, image: string, message: any) => {
  const messageEmbed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setTitle(text)
    .setImage(image)

  return message.channel.send(messageEmbed)
}

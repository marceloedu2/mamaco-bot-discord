import Discord from 'discord.js'
import getRandomColor from '../utils/getRandomColors'

export const sendMessage = (text: string, message: any) => {
  const messageEmbed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setTitle(text)

  return message.channel.send(messageEmbed)
}

export const sendMessageImage = (text: string, image: string, message: any) => {
  const messageEmbed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setTitle(text)
    .setImage(image)

  return message.channel.send(messageEmbed)
}

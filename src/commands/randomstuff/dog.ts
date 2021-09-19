import axios from 'axios'
import Discord from 'discord.js'

import getRandomColors from '../../utils/getRandomColors'

const dog = async (_, message, args) => {
  try {
    const { data } = await axios.get(
      ' https://api.thedogapi.com/v1/images/search',
    )

    const embed = new Discord.MessageEmbed()
      .setColor(getRandomColors())
      .setDescription('Look i found a cute dog :dog:')
      .setImage(data[0].url)

    return message.channel.send(embed)
  } catch (err) {
    const embed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription('Unexpected error in command!')

    return message.channel.send(embed)
  }
}

module.exports = dog

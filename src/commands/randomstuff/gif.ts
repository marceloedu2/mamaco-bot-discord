import Discord from 'discord.js'

import getRandomColor from '../../utils/getRandomColors'

const giphyRandom = require('giphy-random')

const giphyKey = process.env.GIPHY_KEY

const gif = async (client, message, args) => {
  let tag = ''
  if (args) {
    tag = args.join(' ')
  }
  const { data } = await giphyRandom(giphyKey, { tag })

  const gifMsg = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setImage(data.images.original.url)
    .setFooter(data.title)

  return message.channel.send(gifMsg)
}

module.exports = gif

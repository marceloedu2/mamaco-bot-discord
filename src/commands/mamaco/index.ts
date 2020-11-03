import Discord from 'discord.js'
const giphyRandom = require('giphy-random')
const giphyKey = process.env.GIPHY_KEY

const mamaco = async (client, message) => {
  const { data } = await giphyRandom(giphyKey, { tag: 'monkey' })
  const gif = new Discord.MessageEmbed()
    .setColor('#990033')
    .setImage(data.images.original.url)
    .setFooter(data.title)
  return message.channel.send(gif)
}

module.exports = mamaco

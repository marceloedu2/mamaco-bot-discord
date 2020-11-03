import Discord from 'discord.js'
const giphyRandom = require('giphy-random')
const giphyKey = process.env.GIPHY_KEY

const mamaco = async (client, message) => {
  const { data } = await giphyRandom(giphyKey, { tag: 'monkey' })
  console.log(data)
  const gif = new Discord.MessageEmbed()
    .setColor('#990033')
    .setImage(data.images.original.url)
  return message.channel.send(gif)
}

module.exports = mamaco

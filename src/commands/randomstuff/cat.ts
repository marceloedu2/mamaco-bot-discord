import Discord from 'discord.js'
import getRandomColors from '../../utils/getRandomColors'

const Cats = async (client, message, args) => {
  const catGif = await 'http://thecatapi.com/api/images/get'

  const embed = new Discord.MessageEmbed()
    .setColor(getRandomColors())
    .setDescription(`Olhe, eu encontrei um gato fofo :cat:`)
    .setImage(catGif)

  return message.channel.send(embed)
}
module.exports = Cats

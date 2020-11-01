import { getRepository } from 'typeorm'
import SextouImages from '../models/sextouImages'
import Discord from 'discord.js'

interface ISextouImages {
  id: number
  image: string
}

module.exports = async (client, message, args) => {
  const sextouImageRepository = getRepository(SextouImages)

  if (args.length === 0) {
    const images = await sextouImageRepository.find({
      order: {
        id: 'DESC',
      },
      take: 1,
    })

    const random = Math.floor(Math.random() * images[0].id + 1)
    const response: ISextouImages[] = await sextouImageRepository.findByIds([
      random,
    ])
    const messageEmbed = new Discord.MessageEmbed()
      .setColor('#FF5733')
      .setTitle(`Sextou!!!`)
      .setImage(response[0].image)

    message.channel.send(messageEmbed)
  }

  switch (args[0]) {
    case 'add':
      if (
        args[1].indexOf(
          'https://discord.com/' || 'https://cdn.discordapp.com/',
        ) !== -1
      ) {
        return message.channel.send(
          `O comando deve conter um link originario do Discord.`,
          'Ex: !sextou add https: //discord.com/channels/576022672983457802',
        )
      }

      const sextouImage = sextouImageRepository.create({
        image: args[1],
      })

      await sextouImageRepository.save(sextouImage)

      message.channel.send(`Imagem adicionada a lista de imagens. ${args[1]}`)
      break
    case 'remove':
      message.channel.send('**remove.**')
      break
    case 'list':
      message.channel.send('**list.**')
      break
    case args.length === 0:
      message.channel.send('teste')
      break
  }
}

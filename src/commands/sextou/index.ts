import { getRepository } from 'typeorm'
import SextouImages from '../../models/sextouImages'
import Discord, { MessageEmbed } from 'discord.js'
import { URL } from 'url'
import { getPermission2 } from '../../utils/getPermission'
import getRandomColor from '../../utils/getRandomColors'
import { stringIsAValidUrl } from '../../utils/validatedLink'

interface ISextouImages {
  id: number
  image: string
}

const sextou = async (client, message, args) => {
  const sextouImageRepository = getRepository(SextouImages)
  try {
    if (args.length === 0) {
      const images = await sextouImageRepository.find()

      if (images <= []) {
        message.channel.send('**Nenhum registro encontrado.**')
      }

      const random = Math.floor(Math.random() * (images.length - 1) + 1)

      const imageItem = images[random]

      const messageEmbed = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setTitle(`**Sextou!!!** 🎇🎇🎆🎆`)
        .setImage(imageItem.image)

      return message.channel.send(messageEmbed)
    }

    if (!getPermission2(message))
      return message.channel.send(
        `**Comando Exclusivo para adm ou moderador.** *Você não possui permissão para executar esse comando.*`,
      )

    switch (args[0]) {
      case 'add':
        message.delete()
        let messageEmbed: string | MessageEmbed = ''

        if (!stringIsAValidUrl(args[1]).then()) {
          messageEmbed = 'Essa imagem não é um link valido!'
        }

        const imageExist = await sextouImageRepository.find({
          where: {
            image: args[1],
          },
        })

        if (imageExist) {
          messageEmbed = 'Essa imagem já existe em nosso banco de images!'
        }

        const sextouImage = sextouImageRepository.create({
          image: args[1],
        })

        await sextouImageRepository.save(sextouImage)

        messageEmbed = new Discord.MessageEmbed()
          .setColor(getRandomColor())
          .setTitle(`🍻 *Imagem adicionada*`)
          .setImage(args[1])

        message.channel.send(messageEmbed)
        break
      case 'remove':
        const id = args[1].split(',')

        if (!id) {
          return message.channel.send('**Id deve conter um numero!**')
        }
        const registers = await sextouImageRepository.findByIds(id)

        if (registers <= []) {
          return message.channel.send(`**Nenhum registro encontrado.**`)
        }
        await sextouImageRepository.delete(id)
        message.channel.send(`Id: ${id} deletado.`)

        break
      case 'list':
        const listIds: ISextouImages[] = await sextouImageRepository.find()
        if (listIds <= []) {
          return message.channel.send(`**Nenhum registro encontrado.**`)
        }
        listIds.map(item => {
          const list = new Discord.MessageEmbed()
            .setColor(getRandomColor())
            .setTitle(`Id: ${item.id}`)
            .setImage(item.image)

          return message.channel.send(list)
        })

        break
    }
  } catch (err) {
    console.log({ error: err })
  }
}

module.exports = sextou

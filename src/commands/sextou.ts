import { getRepository } from 'typeorm'
import SextouImages from '../models/sextouImages'
import Discord from 'discord.js'
import { getPermission2 } from '../utils/getPermission'

interface ISextouImages {
  id: number
  image: string
}

module.exports = async (client, message, args) => {
  const sextouImageRepository = getRepository(SextouImages)

  try {
    if (args.length === 0) {
      const images = await sextouImageRepository.find({
        order: {
          id: 'DESC',
        },
        take: 1,
      })

      if (images <= []) {
        message.channel.send('**Nenhum registro encontrado.**')
      }

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

    if (!getPermission2(message))
      return message.channel.send(
        `**Comando Exclusivo para adm ou moderador.** *Você não possui permissão para executar esse comando.*`,
      )

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

        const messageEmbed = new Discord.MessageEmbed()
          .setColor('#FF5733')
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
            .setColor('#FF5733')
            .setTitle(`Id: ${item.id}`)
            .setImage(item.image)

          message.channel.send(list)
        })
        break
    }
  } catch (err) {
    console.log({ error: err })
  }
}

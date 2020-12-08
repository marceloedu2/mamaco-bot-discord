import { getRepository } from 'typeorm'
import SextouImages from '../../models/sextouImages'

import { getPermission2 } from '../../utils/getPermission'
import { stringIsAValidUrl } from '../../utils/validatedLink'
import { sendMessage, sendMessageImage } from '../../components/sendMessage'

interface ISextouImages {
  id: number
  image: string
}

const sextou = async (client, message, args) => {
  try {
    const sextouImageRepository = getRepository(SextouImages)

    if (args.length === 0) {
      const images = await sextouImageRepository.find()
      if (!images) {
        return sendMessage('**Nenhum registro encontrado!**', message)
      }

      const random = Math.floor(Math.random() * images.length)

      const imageItem = images[random]

      return sendMessageImage(
        '**Sextou!!!** 🎇🎇🎆🎆',
        imageItem.image,
        message,
      )
    }

    if (!getPermission2(message))
      return sendMessage(
        `**Comando Exclusivo para adm ou moderador.** *Você não possui permissão para executar esse comando.*`,
        message,
      )

    switch (args[0]) {
      case 'add':
        message.delete()

        const image: string = args[1]
        if (!image) {
          return sendMessage(
            `*Deve ser informado um link de uma imagem valida!*`,
            message,
          )
        }
        if (!stringIsAValidUrl(image).then()) {
          return sendMessage('*Imagem não é um link valido!*', message)
        }

        const imageExist = await sextouImageRepository.find({
          where: {
            image: image,
          },
        })

        if (imageExist) {
          return sendMessage(
            `*Imagem já existe em nosso banco de fotos!*`,
            message,
          )
        }

        const sextouImage = sextouImageRepository.create({
          image: args[1],
        })

        await sextouImageRepository.save(sextouImage)

        sendMessageImage('🍻 *Imagem adicionada!*', args[1], message)
        break
      case 'remove':
        const id = args[1].split(',')

        if (!id) {
          return sendMessage('**Id deve conter um numero!**', message)
        }
        const registers = await sextouImageRepository.findByIds(id)

        if (registers <= []) {
          return sendMessage(`**Nenhum registro encontrado!**`, message)
        }
        await sextouImageRepository.delete(id)
        sendMessage(`Id: ${id} deletado.`, message)
        break
      case 'list':
        const listIds: ISextouImages[] = await sextouImageRepository.find()
        if (listIds <= []) {
          return sendMessage(`**Nenhum registro encontrado!**`, message)
        }
        listIds.map(item => {
          return sendMessageImage(`Id: ${item.id}`, item.image, message)
        })

        break
    }
  } catch (err) {
    console.log({ error: err })
    return sendMessage('**Erro ao processar a mensagem.**', message)
  }
}

module.exports = sextou

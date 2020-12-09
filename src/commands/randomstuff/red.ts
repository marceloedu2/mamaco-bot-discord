import Discord from 'discord.js'
import getRandomColor from '../../utils/getRandomColors'
import Pornsearch from 'pornsearch'

type pornRequestPros = {
  title: string
  url: string
  webm: string
}

const red = async (client, message, args) => {
  try {
    let tag = ''
    if (args) {
      tag = args.join(' ')
    }

    if (message.channel.id !== '763017201053597738') {
      const msg = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setFooter(`Comando não destinado a esse canal!`)

      return message.channel.send(msg)
    }

    const Searcher = new Pornsearch(tag)

    const pornGifs: pornRequestPros[] = await Searcher.gifs().then(gifs => gifs)

    const random = Math.floor(Math.random() * pornGifs.length)

    const redMsg = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setImage(pornGifs[random].url)
      .setFooter(pornGifs[random].title)
      .addField(
        `Comando: ${tag}`,
        `Salvar recordação: [Download](${pornGifs[random].webm})`,
      )

    return message.channel.send(redMsg)
  } catch (err) {
    console.log(`Error to red.ts: ${err}`)
  }
}

module.exports = red

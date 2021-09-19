import Discord from 'discord.js'
import Pornsearch from 'pornsearch'

import getRandomColor from '../../utils/getRandomColors'

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

    if (
      message.channel.name.match(/censored/) ||
      message.channel.name.match(/adult/) ||
      message.channel.name.match(/\+18/) ||
      message.channel.name.match(/bot-test/)
    ) {
      const msg = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setFooter(
          `Channel not allowed, look for channel with adult content released!`,
        )

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

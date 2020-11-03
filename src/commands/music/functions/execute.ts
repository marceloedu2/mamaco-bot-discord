import Discord from 'discord.js'
import ytdl from 'ytdl-core'

interface IServerQueue {
  textChannel: string
  voiceChannel: string
  connection: null
  songs: {
    title: string
    url: string
  }[]
  volume: number
  playing: boolean
}

const execute = async (client, message, args) => {
  const queue = client.queue
  const serverQueue: IServerQueue = client.queue?.get(message.guild.id)
  const guild = message.guild
  const voiceChannel = message.member.voice.channel

  if (!voiceChannel)
    return message.channel.send(
      'Você precisa estar em uma sala pra poder me chamar!',
    )
  const permissions = voiceChannel.permissionsFor(message.client.user)
  if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return message.channel.send(
      'Eu preciso de permissão para conectar e falar no canal de voz!',
    )
  }
  if (guild.me.voiceChannel)
    return message.channel.send('Já estou em um canal de voz!')
  try {
    const validatedURL = await ytdl.validateURL(args[1])
    if (!validatedURL)
      return message.channel.send('Link não existe ou é inválido!')

    const { videoDetails: info }: any = await ytdl.getInfo(args[1])
    const song = {
      title: info.title,
      url: info.video_url,
    }

    if (!serverQueue) {
      const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      } as IServerQueue
      queue.set(message.guild.id, queueConstruct)

      queueConstruct.songs.push(song)
      message.delete()

      try {
        queueConstruct.connection = await voiceChannel.join()
        console.log(queueConstruct.songs[0])
        play(client, message, queueConstruct.songs[0])
      } catch (err) {
        console.log(err)
        queue.delete(message.guild.id)
        return message.channel.send(err)
      }
    } else {
      serverQueue.songs.push(song)
      const music = new Discord.MessageEmbed()
        .setColor('#FF33E0')
        .setTitle(`Adicionado à fila:`)
        .setDescription(`<@${message.author.id}> - ${song.title}.`)
      return message.channel.send(music)
    }
  } catch (error) {
    console.log(error)
    message.channel.send(error.message)
  }
}
const play = (client, message, song) => {
  const queue = client.queue
  const guild = message.guild
  const serverQueue = queue.get(message.guild.id)

  if (!song) {
    serverQueue.voiceChannel.leave()
    queue.delete(guild.id)
    return
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on('finalizado', () => {
      serverQueue.songs.shift()
      play(client, message, serverQueue.songs[0])
    })
    .on('error', error => console.error(error))
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
  const music = new Discord.MessageEmbed()
    .setColor('#FF33E0')
    .setTitle(`Tocando Musica:`)
    .setDescription(`<@${message.author.id}> - ${song.title}.`)
  console.log({ client, message })
  serverQueue.textChannel.send(music)
}

export default execute
//https://github.com/TannerGabriel/discord-bot

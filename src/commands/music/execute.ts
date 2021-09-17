import Discord from 'discord.js'
import yts from 'yt-search'
import ytdl from 'ytdl-core'

import getRandomColor from '../../utils/getRandomColors'
import play from './play'

const execute = async (message, serverQueue, queue) => {
  const args = message.content.split(' ')
  let url = args[2]

  const voiceChannel = message.member.voice.channel
  if (!voiceChannel) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setDescription('**You need to be in a voice channel to play music!**')
    return message.channel.send(messageEmbed)
  }
  const permissions = voiceChannel.permissionsFor(message.client.user)
  if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setDescription(
        '**I need the permissions to join and speak in your voice channel!**',
      )

    return message.channel.send(messageEmbed)
  }

  if (
    !url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    )
  ) {
    const search = await yts(
      args
        .splice(-(args.length - 2), args.length - 2)
        .toString()
        .replace(/,/gi, ' '),
    )

    if (search.length <= 0) {
      const messageEmbed = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setDescription('**Link required to play music!**')

      return message.channel.send(messageEmbed)
    }

    url = search.all[0].url
  }

  if (
    !url.match(
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
    )
  ) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setDescription('**Link required to play music!**')

    return message.channel.send(messageEmbed)
  }

  const songInfo = await ytdl.getInfo(url)
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url,
  }

  if (!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    }

    queue.set(message.guild.id, queueConstruct)

    queueConstruct.songs.push(song)

    try {
      const connection: any = await voiceChannel.join()
      queueConstruct.connection = connection
      play(message.guild, queueConstruct.songs[0], queue)
    } catch (err) {
      console.log(err)
      queue.delete(message.guild.id)
      return message.channel.send(err)
    }
  } else {
    serverQueue.songs.push(song)

    const messageEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setDescription(`🔈 **ADD QUEUE** - ${song.title}`)

    return message.channel.send(messageEmbed)
  }
}

export default execute

import Discord from 'discord.js'
import ytdl from 'ytdl-core'

import getRandomColor from '../../utils/getRandomColors'
import listMusics from './listMusics'
import skip from './skip'
import stop from './stop'

const queue: any = new Map()

export const play = (guild, song) => {
  const serverQueue = queue.get(guild.id)
  if (!song) {
    serverQueue.voiceChannel.leave()
    queue.delete(guild.id)
    return
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on('finish', () => {
      serverQueue.songs.shift()
      play(guild, serverQueue.songs[0])
    })
    .on('error', error => console.error(error))

  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)

  const messageEmbed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setDescription(`🔈 **Start playing** - ${song.title}`)

  serverQueue.textChannel.send(messageEmbed)
}

const execute = async (message, serverQueue) => {
  const args = message.content.split(' ')

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
    !args[2].match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    )
  ) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setDescription('**Link required to play music!**')

    return message.channel.send(messageEmbed)
  }

  const songInfo = await ytdl.getInfo(args[2])
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
      play(message.guild, queueConstruct.songs[0])
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

const music = async (client, message, args) => {
  const serverQueue = queue.get(message.guild.id)

  if (
    !message.channel.name.toLowerCase().match(/music/) &&
    !message.channel.name.toLowerCase().match(/bot-test/)
  ) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`❌ **specific command for music channel**`)

    return message.channel.send(messageEmbed)
  } else if ((args[0] === 'play' || args[0] === 'p') && args[1]) {
    execute(message, serverQueue)
    return
  } else if (args[0] === 'skip') {
    skip(message, serverQueue)
    return
  } else if (args[0] === 'stop') {
    stop(message, serverQueue)
    return
  } else if (args[0] === 'queue' || args[0] === 'q') {
    listMusics(message, serverQueue)
    return
  } else {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor('#FF0000')
      .setDescription('❌ **You need to enter a valid command!**')

    message.channel.send(messageEmbed)
  }

  return ''
}

module.exports = music

import Discord from 'discord.js'
import spotifyToYT from 'spotify-to-yt'
import yts from 'yt-search'
import ytdl from 'ytdl-core'

import getRandomColor from '../../utils/getRandomColors'
import play from './play'

type songTypes = {
  title: string
  url: string
}

const execute = async (message, serverQueue, queue) => {
  const args = message.content.split(' ')
  const url = args[2]

  const voiceChannel = message.member.voice.channel
  if (!voiceChannel) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setDescription('❌ **You need to be in a voice channel to play music!**')
    return message.channel.send(messageEmbed)
  }

  const permissions = voiceChannel.permissionsFor(message.client.user)

  if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setDescription(
        '❌ **I need the permissions to join and speak in your voice channel!**',
      )

    return message.channel.send(messageEmbed)
  }
  let song: songTypes = { title: '', url: '' }

  if (
    !url.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    )
  ) {
    try {
      const search = await yts(
        args
          .splice(-(args.length - 2), args.length - 2)
          .toString()
          .replace(/,/gi, ' '),
      )

      if (search.length <= 0) {
        const messageEmbed = new Discord.MessageEmbed()
          .setColor(getRandomColor())
          .setDescription('❌ **Link required to play music!**')

        return message.channel.send(messageEmbed)
      }

      const songInfo = await ytdl.getInfo(search.all[0].url)

      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
      }
    } catch (err) {
      const messageEmbed = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setDescription('❌ **Search - search failed! **')

      return message.channel.send(messageEmbed)
    }
  } else if (
    url.match(
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
    )
  ) {
    try {
      const songInfo = await ytdl.getInfo(url)

      song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
      }
    } catch (err) {
      const messageEmbed = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setDescription('❌ **Youtube - Invalid music link! **')

      return message.channel.send(messageEmbed)
    }
  } else if (url.match(/((open|play)\.spotify\.com\/)/)) {
    try {
      const stylePlay = await spotifyToYT.isTrackOrPlaylist(url)

      if (stylePlay === 'track') {
        try {
          const musicUrl = await spotifyToYT.trackGet(url)

          song = {
            title: musicUrl.info[0].title,
            url: musicUrl.url,
          }
        } catch (err) {
          console.log(err)
          const messageEmbed = new Discord.MessageEmbed()
            .setColor(getRandomColor())
            .setDescription('❌ **Spotify - Invalid music link!**')

          return message.channel.send(messageEmbed)
        }
      } else if (stylePlay === 'playlist') {
        try {
          // const musicsUrl = await spotifyToYT.playListGet(url)
          const messageEmbed = new Discord.MessageEmbed()
            .setColor(getRandomColor())
            .setDescription(
              '❌ **Spotify - Playlist playback is temporarily unavailable!**',
            )

          return message.channel.send(messageEmbed)
        } catch (err) {
          console.log(err)
          const messageEmbed = new Discord.MessageEmbed()
            .setColor(getRandomColor())
            .setDescription('❌ **Spotify - This playlist link is invalid!**')

          return message.channel.send(messageEmbed)
        }
      } else {
        const messageEmbed = new Discord.MessageEmbed()
          .setColor(getRandomColor())
          .setDescription('❌ **Link required to play or playList!**')

        return message.channel.send(messageEmbed)
      }
    } catch (err) {
      console.log(err)

      const messageEmbed = new Discord.MessageEmbed()
        .setColor(getRandomColor())
        .setDescription('❌ **Invalid link!**')

      return message.channel.send(messageEmbed)
    }
  } else {
    const messageEmbed = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setDescription('❌ **Link required to play music!**')

    return message.channel.send(messageEmbed)
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

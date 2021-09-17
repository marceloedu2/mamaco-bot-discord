import Discord from 'discord.js'
import ytdl from 'ytdl-core'

import getRandomColor from '../../utils/getRandomColors'

const play = (guild, song, queue) => {
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
      play(guild, serverQueue.songs[0], queue)
    })
    .on('error', error => console.error(error))

  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)

  const messageEmbed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setDescription(`🔈 **Start playing** - ${song.title}`)

  serverQueue.textChannel.send(messageEmbed)
}

export default play

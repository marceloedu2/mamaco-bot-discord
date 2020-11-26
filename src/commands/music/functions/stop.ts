const stop = (client, message, args) => {
  const serverQueue = client.queue.get(message.guild.id)
  if (!message.member.voice.channel)
    return message.channel.send(
      'Você tem que estar em um canal de voz para parar a música!',
    )
  serverQueue.songs = []
  serverQueue.connection.dispatcher.end()
}

export default stop

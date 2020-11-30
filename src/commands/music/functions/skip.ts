const skip = (client, message, args) => {
  const serverQueue = client.queue.get(message.guild.id)
  if (!message.member.voice.channel)
    return message.channel.send(
      'Você tem que estar em um canal de voz para parar a música!',
    )
  if (!serverQueue)
    return message.channel.send('Não há música que eu pudesse pular!')
  serverQueue.connection.dispatcher.end()
}

export default skip

import execute from './functions/execute'
import skip from './functions/skip'
import stop from './functions/stop'

const music = async (client, message, args) => {
  const user = message.author

  if (!message.guild) return
  if (user.bot) return

  if (!args[0])
    return message.channel.send(`**Comando inválido digite um comando válido**`)

  switch (args[0].toLowerCase()) {
    case 'play':
      await execute(client, message, args)
      break
    case 'skip':
      await skip(client, message, args)
      break
    case 'stop':
      await stop(client, message, args)
      message.channel.send('funcionalidade em desenvolvimento')
      break
  }
}
module.exports = music

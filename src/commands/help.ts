import Discord from 'discord.js'
import getFileNames from '../utils/getFileNames'

module.exports = async (client, message, args) => {
  const listPathFiles = await getFileNames('./src/commands', '')
  const listFiles = listPathFiles.map(item => {
    return item
      .replace('./src/commands/', '!')
      .replace('.ts', '')
      .replace('.js', '')
  })
  const msg = new Discord.MessageEmbed()
    .setColor('#77DD77')
    .setTitle('Comandos bots:')
    .setDescription('Lista de todos os comandos de acão:')
    .addField('Lista de Comandos', listFiles)
    .addFields(
      { name: '\u200B', value: '\u200B' },
      { name: '!avatar', value: 'Exibe seu avatar. ex: !avatar' },
      { name: 'coinflip', value: 'Jogo de cara ou coroa.' },
      {
        name: '!help',
        value: 'Destinado a exibir detalhes sobre comandos.',
      },
      {
        name: '!ping',
        value: 'exibe seu ping com base no servidor de Discord.',
      },
      {
        name: '!roll',
        value: 'Comando destinado ao RPG, rolador de dados randômico.',
      },
      { name: '!say', value: 'O bot repitirá o que foi informado.' },
      {
        name: '!sextou',
        value: 'Comando destinado a exibir fotos relacionada a sextou.',
      },
      {
        name: '!seggestion',
        value:
          'Comando destinado a recolher sugestoes de melhoria do Discord e afins.',
      },
    )

  return message.channel.send(msg)
}

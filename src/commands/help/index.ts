import Discord from 'discord.js'
import getRandomColor from '../../utils/getRandomColors'

const help = async (client, message, args) => {
  const msg = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setTitle('Comandos bots:')
    .setDescription('Lista de todos os comandos de acão:')
    .addFields(
      { name: '!avatar', value: 'Exibe seu avatar. ex: !avatar' },
      { name: '!coinflip', value: 'Jogo de cara ou coroa.' },
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
        value: 'Comando destinado ao RPG, rolador de dados aleatório.',
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
      {
        name: '!music',
        value: 'Comando para tocar musicas.',
      },
      {
        name: '!mamaco',
        value: 'Comando para retornar um GIF aleatório de mamaco.',
      },
      {
        name: '!gif',
        value: 'Comando para retornar um GIF aleatório do parâmetro informado.',
      },
    )

  return message.channel.send(msg)
}

module.exports = help

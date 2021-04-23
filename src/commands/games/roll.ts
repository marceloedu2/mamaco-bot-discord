import Discord from 'discord.js';

import getRandomColor from '../../utils/getRandomColors';

const roll = async (client, message, args) => {
  const complement = args[0].split(",")
  const dices = complement[0].toLowerCase().split('d')
  let calc = 0
  const rolling = []

  if (!dices[0]) {
    dices[0] = 1
  }
  if (!dices[1]) {
    const roll = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setTitle('Valor do dados deve ser informado!')
      .setDescription('Ex: *3d10*')
    return message.channel.send(roll)
  }

  if (complement[1]) {
    calc = eval(complement[1])
  }


  if (dices[0] == 0 || dices[1] == 0) {
    const roll = new Discord.MessageEmbed()
      .setColor(getRandomColor())
      .setDescription(`🎲 **0** ┃ 0 ┃  *${args}* - <@${message.author.id}>`)
    return message.channel.send(roll)
  }

  for (let i = 0; i < dices[0]; i++) {
    rolling.push(Math.floor(Math.random() * dices[1] + 1))
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue

  const soma = rolling.reduce(reducer)
  const roll = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setDescription(
      `🎲  **${soma+calc}**  ┃ ${calc > 0 ? `[ ${rolling} ] ${complement[1]}`: rolling } ┃ *${args}* - <@${message.author.id}>`,
    )

  message.channel.send(roll)
}

module.exports = roll

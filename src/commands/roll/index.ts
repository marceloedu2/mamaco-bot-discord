const roll = async (client, message, args) => {
  const dices = args[0].toLowerCase().split('d')

  const rolling = []

  if (!dices[0]) {
    dices[0] = 1;
  }
  if (!dices[1]) {
    return message.channel.send(`
    **Valor do dados deve ser informado!**
Ex: *3d10*`)
  }

  if (dices[0] == 0 || dices[1] == 0) {
    return message.channel.send(`
    <@${message.author.id}>:
🎲 **0** ┃ 0 ┃ *${args}*`)
  }

  for (let i = 0; i < dices[0]; i++) {
    rolling.push(Math.floor(Math.random() * dices[1] + 1))
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue

  const soma = rolling.reduce(reducer)

  message.channel.send(`
  <@${message.author.id}>:
🎲 **${soma}** ┃ ${rolling} ┃ *${args}*`)
}

module.exports = roll

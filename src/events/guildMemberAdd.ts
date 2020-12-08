import getRandomColor from '../utils/getRandomColors'

const Discord = require('discord.js')

module.exports = (client, member) => {
  const channel = member.guild.channels.cache.find(
    ch => ch.name === '🎉┃welcome',
  )
  // const canal = member.guild.channels.cache.find(
  //     ch => ch.id === '772689177731923978',
  //   )
  if (!channel) return
  member.send(
    `Bem vindo ao servidor ${member} leia o canal de regras e aproveite sua jornada até nosso servidor!`,
  )

  let sicon = member.user.displayAvatarURL()
  let serverembed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setThumbnail(sicon)
    .addField(
      'Aí vem um novo desafiante!',
      `Um novo membro se juntou ao nosso servidor ${member}`,
    )

  channel.send(serverembed)
}

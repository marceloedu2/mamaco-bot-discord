import getRandomColor from '../utils/getRandomColors'

const Discord = require('discord.js')

module.exports = (client, member) => {
  const channel = member.guild.channels.cache.find(ch =>
    ch.name.match(/welcome/),
  )

  if (!channel) return
  member.send(
    `Bem vindo ao servidor ${member} leia o canal de regras e aproveite sua jornada até nosso servidor!`,
  )

  const sicon = member.user.displayAvatarURL()
  const serverembed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setThumbnail(sicon)
    .addField(
      'Aí vem um novo desafiante!',
      `Um novo membro se juntou ao nosso servidor ${member}`,
    )

  channel.send(serverembed)
}

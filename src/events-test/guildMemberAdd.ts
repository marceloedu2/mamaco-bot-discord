import getRandomColor from '../utils/getRandomColors'

const Discord = require('discord.js')

module.exports = (_, member) => {
  member.roles.add(
    member.guild.roles.cache.find(i => i.name === 'Among The Server'),
  )

  const sicon = member.user.displayAvatarURL()
  const welcomeEmbed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setThumbnail(sicon)
    .addField(
      'Aí vem um novo desafiante!',
      `Um novo membro se juntou ao nosso servidor ${member}`,
    )

  member.guild.channels.cache
    .find(
      channel =>
        channel.name.toLowerCase().match(/welcome/) ||
        channel.name.toLowerCase().match(/bot-test/),
    )
    .send(welcomeEmbed)
}

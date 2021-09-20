import getRandomColor from '../utils/getRandomColors'

const Discord = require('discord.js')

module.exports = (_, member) => {
  member.roles.add(
    member.guild.roles.cache.find(i => i.name === 'Among The Server'),
  )

  const goodbyeEmbed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .addField(
      `**${member.user.username}** was not the impostor there are **${member.guild.memberCount}** left Among Us`,
    )
    .setImage(
      'https://gamewith-en.akamaized.net/article/thumbnail/rectangle/22183.png',
    )

  member.guild.channels.cache
    .find(
      channel =>
        channel.name.toLowerCase().match(/welcome/) ||
        channel.name.toLowerCase().match(/bot-test/),
    )
    .send(goodbyeEmbed)
}

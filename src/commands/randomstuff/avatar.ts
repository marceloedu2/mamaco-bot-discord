import Discord from 'discord.js'

import getRandomColor from '../../utils/getRandomColors'

const avatar = async (client, message, args) => {
  const user =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    message.author

  const avatar = user.avatarURL({ dynamic: true, format: 'png', size: 1024 })

  const embed = new Discord.MessageEmbed()
    .setColor(getRandomColor())
    .setTitle(`${user.username} avatar`)
    .setImage(avatar)
    .setFooter(
      `• Autor: ${message.author.tag}`,
      message.author.displayAvatarURL({ format: 'png' }),
    )
  await message.channel.send(embed)
}

module.exports = avatar

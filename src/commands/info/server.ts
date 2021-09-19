import Discord from 'discord.js'

import getRandomColors from '../../utils/getRandomColors'

let days = 0
let week = 0

const info = (client, message, args) => {
  let uptime = ``
  let totalSeconds = client.uptime / 1000
  let hours = Math.floor(totalSeconds / 3600)
  totalSeconds %= 3600
  let minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.floor(totalSeconds % 60)

  const servers = client.guilds.cache.size
  const users = client.users.cache.size

  if (hours > 23) {
    days = days + 1
    hours = 0
  }

  if (days === 7) {
    days = 0
    week = week + 1
  }

  if (week > 0) {
    uptime += `${week} week, `
  }

  if (minutes > 60) {
    minutes = 0
  }

  uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`

  const serverembed = new Discord.MessageEmbed()
    .setColor(getRandomColors())
    .setAuthor(`Mamaco-bot`, client.user.displayAvatarURL)
    .addField(`Version`, `1.0`, true)
    .addField(`Library`, `Discord.js`, true)
    .addField(`Servers`, `${servers}`, true)
    .addField(`Users`, `${users}`, true)
    .setFooter(`Uptime: ${uptime}`)

  message.channel.send(serverembed)
}
module.exports = info

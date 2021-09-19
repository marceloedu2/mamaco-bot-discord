const ping = async (client, message, args) => {
  const m = await message.channel.send('ping')

  m.edit(
    `🏓 **| Pongsss!**\nServer latency: **${
      m.createdTimestamp - message.createdTimestamp
    }ms.**\nAPI latency: **${Math.round(client.ws.ping)}ms**`,
  )
}

module.exports = ping

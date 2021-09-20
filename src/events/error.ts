module.exports = async (client, message) => {
  client.logger.log(
    `An error event was sent by Discord.js: \n${JSON.stringify(message)}`,
    'error',
  )
}

import 'dotenv/config'
import express from 'express'
import Discord from 'discord.js'

const app = express()
const client = new Discord.Client()


app.get('/', (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3)
  console.log(`Ping recebido as ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200)
})

app.listen(3333, () => {
  console.log("Server started port:3333");
})

client.login(process.env.TOKEN).then()


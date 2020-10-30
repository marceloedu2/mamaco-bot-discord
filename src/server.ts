import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Discord from 'discord.js'

const app = express()
const client = new Discord.Client()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3)
  console.log(`Ping recebido as ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200)
})

app.listen( process.env.PORT || 3333, () => {
  console.log(`Server started port: ${process.env.PORT || 3333}`);
})

client.login(process.env.TOKEN).then()


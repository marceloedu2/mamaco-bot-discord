import 'dotenv/config'
import express from 'express'

import cors from 'cors'
import DiscordBot from './client'
//import './database/connection'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('BOT MAMACO EXCLUSIVE TO DISCORD SAFE ZONE')
})

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started port:3333')
})
DiscordBot.getInstance().connect()

import 'dotenv/config'

//import './database/connection'
import cors from 'cors'
import express from 'express'

import DiscordBot from './client'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('BOT MAMACO EXCLUSIVE TO DISCORD SAFE ZONE')
})


app.listen(process.env.PORT || 3333, () => {
  console.log(`Server started port:${process.env.PORT || 3333}`)
})

DiscordBot.getInstance().connect()

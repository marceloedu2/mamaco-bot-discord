import 'dotenv/config'
import express, { request, response } from 'express'
import cors from 'cors'
import { DiscordBot } from './client'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('GG')
})

app.listen(3333, () => {
  console.log('Server started port:3333')
})

DiscordBot.getInstance().connect()

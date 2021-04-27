import 'dotenv/config'

import cors from 'cors'
import express, { request } from 'express'

import DiscordBot from './client'

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

console.log('Successfully conected');

let reqTimer = setTimeout(function wakeUp() {
   request("https://mamaco-bot-app.herokuapp.com/", () => {
      console.log("WAKE UP DYNO");
   });
   return reqTimer = setTimeout(wakeUp, 1200000);
}, 1200000);

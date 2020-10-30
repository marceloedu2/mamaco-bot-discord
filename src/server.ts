import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { DiscordBot } from './client'

const app = express()

app.use(cors())
app.use(express.json())

const bot = DiscordBot.getInstance()

bot.connect()

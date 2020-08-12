import express from 'express'
import connectDB from './lib/server/db'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

const app:express.Application = express()
import router from './router/router'

//configure
dotenv.config()
connectDB()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use('/', router)

app.listen(process.env.PORT, () => {
	console.log('start')
})
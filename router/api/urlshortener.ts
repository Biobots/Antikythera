import express from 'express'
import joi from 'joi'
import crypto from 'crypto'
import URL from '../../lib/urlshortener/model'

const router = express.Router()

const urlSchema = joi.object().keys({
	url: joi.string().uri().required()
})

router.use((req, res, next) => {
	next()
})

router.get('/:code', async function(req, res) {
	try {
		const code = req.params.code
		const url = await URL.findOne({code: code})
		if (url) {
			res.redirect(url.url)
		} else {
			res.status(404).json('Url not found')
		}
	} catch (err) {
		console.log(err)
		res.status(500).json('Server error')
	}
})

router.post('/', async function(req, res) {
	try {
		if (!(urlSchema.validate(req.body).error)) {
			const longurl = req.body
			const url = await URL.findOne(longurl)
			if (url) {
				res.json({code:url.code})
			} else {
				let code = ''
				do {
					code = crypto.randomBytes(9).toString('base64').replace(/\//g,'_').replace(/\+/g,'-')
				} while (await URL.findOne({code: code}))
				await new URL({
					code: code,
					url: longurl.url
				}).save()
				res.json({code:code})
			}
		} else {
			res.status(406).json('Url validation failed')
		}
	} catch (err) {
		console.log(err)
		res.status(500).json('Server error')
	}
})

export default router
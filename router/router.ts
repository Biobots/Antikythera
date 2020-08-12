import express = require('express')
const router = express.Router()

router.use((req, res, next) => {
	console.log(JSON.stringify({
		'Api': req.url,
		'Time': Date.now()
	}))
	next()
})

import api from './api/api'
router.use('/', api)

export default router
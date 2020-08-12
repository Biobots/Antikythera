import express = require('express')
const router = express.Router()

import ccr from './ccr'
import urlshrt from './urlshortener'

router.use((req, res, next) => {
	next()
})

router.use('/ccr', ccr)
router.use('/url', urlshrt)

export default router
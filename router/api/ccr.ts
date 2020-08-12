import express = require('express')
import { User, getUser } from '../../lib/ccr/user'
import { dumpFile } from '../../lib/ccr/parser'
const router = express.Router()

router.use((req, res, next) => {
	next()
})

router.get('/:id', async function(req:express.Request, res:express.Response) {
	try {
		const id:string = req.params.id
		const user:User = await getUser(id)
		user.generateDoc()
		res.writeHead(200, {'Content-type': 'text/yaml', 'Content-Disposition': 'attachment; filename=out.yml'}).write(dumpFile(user))
		res.end()
	} catch(err) {
		console.log(err)
		res.status(500).write(err)
		res.end()
	}
})

export default router
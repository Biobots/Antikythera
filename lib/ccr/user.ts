import yaml = require('js-yaml');
import fs = require('fs');
import path = require('path')
import * as Proxy from './proxy'
import * as Parser from './parser'
import * as Rule from './rule'
import * as Type from './types'
import { isRight } from 'fp-ts/lib/Either'

export class User {

	header=''
	config:Type.Config
	proxies:Type.Proxy[]=[]
	rules:Rule.RuleGroup[]=[]

	groups:Proxy.ProxyGroup[]=[]

	doc:Record<string, string[]> = {
		proxies:[],
		proxyGroups:[],
		rules:[]
	}

	constructor(id:string) {
		try {
			const c = Type.tConfig.decode(yaml.safeLoad(fs.readFileSync(path.join(<string>process.env.CCR_DIR, id+'.yml'), 'utf-8')))
			if (isRight(c)) this.config = c.right
			else {
				console.log(c.left)
				process.exit(1)
			}
			this.header = fs.readFileSync(path.join(<string>process.env.CCR_DIR, this.config.header), 'utf-8')
			
		} catch (error) {
			console.log(error)
			process.exit(1)
		}
	}

	buildProxyGroups():void {
		this.groups = Parser.parseProxyGroups(this.config.groups)
		this.groups.forEach(g => {
			if (g.keywords!=null)
			{
				const keywords = g.keywords.map(k => k.split(' '))
				g.proxies = Parser.filterProxy(keywords, this.proxies)
			}
		})
	}

	generateDoc():void {
		this.generateProxies()
		this.generateRules()
		this.generateGroups()
	}

	generateProxies():void {
		this.proxies.forEach(item => {
			this.doc.proxies.push(JSON.parse(JSON.stringify(item)))
		})
	}

	generateRules():void {
		this.rules.sort((a, b) => a.prior - b.prior)
			.map(r => r.getRaw())
			.forEach(s => s.forEach(ss => this.doc.rules.push(ss)))
		this.doc.rules.push('MATCH,'+this.config.final)
	}

	generateGroups():void {
		this.groups.forEach(item => {
			this.doc.proxyGroups.push(JSON.parse(JSON.stringify(item.getRaw())))
		})
	}
}

export async function getUser(id:string):Promise<User> {
	const usr = new User(id)
	await Parser.buildProxies(usr)
	await Parser.buildRuleGroups(usr)
	usr.buildProxyGroups()
	return usr
}
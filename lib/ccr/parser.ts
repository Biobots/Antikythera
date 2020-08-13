import yaml = require('js-yaml');
import * as Proxy from './proxy'
import * as Net from './network'
import { User } from './user'
import { Rule, RuleGroup } from './rule'
import { check } from './utils'
import * as Type from './types'
import { isRight } from 'fp-ts/lib/Either'

export function parseProxies(proxies:Array<string>): Array<Type.Proxy> {
	if (!check(proxies)) return []
	const rst:Type.Proxy[] = []
	proxies
		.map(raw => Type.tProxy.decode(raw))
		.forEach(item => {
			if(isRight(item)) rst.push(item.right)
		})
	return rst
}

export function parseProxyGroups(proxyGroups:Array<Type.ProxyGroup>): Array<Proxy.ProxyGroup> {
	if (!check(proxyGroups)) return []
	const rst:Array<Proxy.ProxyGroup> = []
	proxyGroups
		.map(raw => Type.tProxyGroup.decode(raw))
		.forEach(item => {
			if(isRight(item)) rst.push(new Proxy.ProxyGroup(item.right))
		})
	return rst
}

export async function buildProxies(usr:User): Promise<void> {
	const rst = await Net.getUrls(usr.config.sub)
	usr.proxies = rst.map(item => item.data)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		.map(doc => <any>yaml.safeLoad(doc))
		.map(obj => <string[]>obj.proxies)
		.map(raw => parseProxies(raw))
		.reduce((all, cur) => all.concat(cur))
	if (typeof(usr.config.proxy)!='undefined') usr.proxies = usr.proxies.concat(parseProxies(usr.config.proxy))
}

export async function buildRuleGroups(usr:User): Promise<void> {
	usr.rules = await Promise.all(
		usr.config.rule.map(
			async (r: Type.RuleConfig) => {
				let payload:Array<Rule> = []
				if (typeof(r.url)!='undefined' && r.url != null) {
					const rst = await Net.getUrls(r.url)
					payload = rst.map(item => item.data)
						.map(doc => {
							const payload = Type.tRulePayload.decode(yaml.safeLoad(doc))
							return isRight(payload) ? payload.right : {payload: []}
						})
						.map(obj => <string[]>obj.payload)
						.map(raw => raw.map((s: string) => new Rule(s)))
						.reduce((all, cur) => all.concat(cur))
				}
				if (typeof(r.extra)!='undefined' && r.extra != null) {
					payload = payload.concat(r.extra.map((record: string) => new Rule(record)))
				}
				return new RuleGroup(r.name, r.prior, payload)
			}
		)
	)
}

export function filterProxy(keys:Array<string[]>, proxies:Type.Proxy[]): Type.Proxy[] {
	let output = proxies
	output = output.filter(proxy => keys.every(k => k.some(kk => proxy.name.includes(kk))))
	return output
}

export function dumpFile(usr:User): string {
	let str = usr.header+'\n'
	str += yaml.safeDump(usr.doc)
	str = str.replace('proxyGroups', 'proxy-groups')
	return str
}
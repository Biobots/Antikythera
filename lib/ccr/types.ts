import * as t from 'io-ts'

export type Proxy = t.TypeOf<typeof tProxy>
export const tProxy = t.type({
	name: t.string,
	server: t.string,
	port: t.number,

	type: t.string,

	uuid: t.union([t.string, t.undefined]),
	alterId: t.union([t.number, t.undefined]),
	cipher: t.union([t.string, t.undefined]),
	udp: t.union([t.boolean, t.undefined]),
	tls: t.union([t.boolean, t.undefined]),
	skipCertVerify: t.union([t.boolean, t.undefined]),
	network: t.union([t.string, t.undefined]),
	wsPath: t.union([t.string, t.undefined]),
	username: t.union([t.string, t.undefined]),
	password: t.union([t.string, t.undefined]),
	sni: t.union([t.string, t.undefined]),
})

export const tProxies = t.array(tProxy)

export type ProxyGroup = t.TypeOf<typeof tProxyGroup>
export const tProxyGroup = t.type({
	name: t.string,
	type: t.string,

	keywords: t.union([t.array(t.string), t.null]),
	subgroup: t.union([t.array(t.string), t.undefined]),
	url: t.union([t.string, t.undefined]),
	interval: t.union([t.number, t.undefined]),
})

export type OutputGroup = t.TypeOf<typeof tOutputGroup>
export const tOutputGroup = t.type({
	name: t.string,
	type: t.string,

	proxies: t.array(t.string),
	url: t.union([t.string, t.undefined]),
	interval: t.union([t.number, t.undefined]),
})

export type RuleConfig = t.TypeOf<typeof tRuleConfig>
export const tRuleConfig = t.type({
	name: t.string,
	prior: t.number,
	url: t.union([t.array(t.string), t.undefined]),
	extra: t.union([t.array(t.string), t.undefined])
})

export type Config = t.TypeOf<typeof tConfig>
export const tConfig = t.type({
	header: t.string,
	final: t.string,
	sub: t.array(t.string),

	rule: t.array(tRuleConfig),
	proxy: t.union([t.array(t.string), t.undefined]),
	groups: t.array(tProxyGroup)
})

export type Sub = t.TypeOf<typeof tSub>
export const tSub = t.type({
	proxies: t.array(t.string),
})

export type RulePayload = t.TypeOf<typeof tRulePayload>
export const tRulePayload = t.type({
	payload: t.array(t.string)
})
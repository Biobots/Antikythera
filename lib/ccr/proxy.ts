import * as Type from './types'

export enum ProxyType {
	Base,
	Vmess,
	Shadowsocks,
	Socks5,
	Http,
	Snell,
	Trojan,
	ShadowsocksR
}

export enum ProxyGroupType {
	Base,
	Select,
	UrlTest,
	Fallback,
	LoadBalance,
	Relay
}

export class ProxyGroup {
	name:string
	type:string
	keywords:Array<string>|null
	proxies:Array<Type.Proxy>
	subgroup:Array<string> = []
	url:string|undefined
	interval:number|undefined

	constructor(raw:Type.ProxyGroup) {
		this.name = raw.name
		this.keywords = raw.keywords
		this.type = raw.type
		this.proxies = []
		this.url = raw.url
		this.interval = raw.interval
		if (typeof(raw.subgroup)!='undefined') this.subgroup = raw.subgroup
	}

	getRaw(): Type.OutputGroup{
		return {
			name:this.name,
			type:this.type,
			url:this.url,
			interval:this.interval,
			proxies:this.subgroup.concat(this.proxies.map(p => p.name))
		}
	}
}
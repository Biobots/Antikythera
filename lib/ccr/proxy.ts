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

export abstract class BaseProxyGroup {
	name:string
	type:ProxyGroupType
	keywords:Array<string>
	proxies:Array<BaseProxy>
	subgroup:Array<string> = []

	raw:any

	constructor(raw:any) {
		this.raw = raw
		this.name = raw.name
		this.keywords = raw.keywords
		this.type = ProxyGroupType.Base
		this.proxies = []
		if (typeof(raw.subgroup)!='undefined') this.subgroup = raw.subgroup
	}

	abstract getRaw(): any;
}

export class SelectProxyGroup extends BaseProxyGroup {

	constructor(raw:any) {
		super(raw)
		this.type = ProxyGroupType.Select
	}

	getRaw(): any{
		return {
			name:this.name,
			type:'select',
			proxies:this.subgroup.concat(this.proxies.map(p => p.name))
		}
	}
}

export class UrlTestProxyGroup extends BaseProxyGroup {
	url:string
	interval:number

	constructor(raw:any) {
		super(raw)
		this.type = ProxyGroupType.UrlTest
		this.url = raw.url
		this.interval = raw.interval
	}

	getRaw(): any{
		return {
			name:this.name,
			type:'url-test',
			url:this.url,
			interval:this.interval,
			proxies:this.subgroup.concat(this.proxies.map(p => p.name))
		}
	}
}

export class LoadBalanceProxyGroup extends BaseProxyGroup {
	url:string
	interval:number

	constructor(raw:any) {
		super(raw)
		this.type = ProxyGroupType.LoadBalance
		this.url = raw.url
		this.interval = raw.interval
	}

	getRaw(): any{
		return {
			name:this.name,
			type:'load-balance',
			url:this.url,
			interval:this.interval,
			proxies:this.subgroup.concat(this.proxies.map(p => p.name))
		}
	}
}

export class FallbackProxyGroup extends BaseProxyGroup {
	url:string
	interval:number

	constructor(raw:any) {
		super(raw)
		this.type = ProxyGroupType.Fallback
		this.url = raw.url
		this.interval = raw.interval
	}

	getRaw(): any{
		return {
			name:this.name,
			type:'fallback',
			url:this.url,
			interval:this.interval,
			proxies:this.subgroup.concat(this.proxies.map(p => p.name))
		}
	}
}

export class RelayProxyGroup extends BaseProxyGroup {

	constructor(raw:any) {
		super(raw)
		this.type = ProxyGroupType.Relay
	}

	getRaw(): any{
		return {
			name:this.name,
			type:'relay',
			proxies:this.subgroup.concat(this.proxies.map(p => p.name))
		}
	}
}

export class BaseProxy {
	name:string
	type:ProxyType

	raw:any

	constructor(raw:any) {
		this.name = raw.name
		this.raw = raw
		this.type = ProxyType.Base
	}
}

export class Vmess extends BaseProxy {
	server=''
	port=0
	uuid=''
	alterId=0
	cipher=''

	udp:boolean|undefined=undefined
	tls:boolean|undefined=undefined
	skipCertVerify:boolean|undefined=undefined
	network:string|undefined=undefined
	wsPath:string|undefined=undefined

	constructor(raw:any) {
		super(raw)

		this.type = ProxyType.Vmess

		this.server = raw.server
		this.port = raw.port
		this.uuid = raw.uuid
		this.alterId = raw.alterId
		this.cipher = raw.cipher

		this.udp = raw.udp
		this.tls = raw.tls
		this.skipCertVerify = raw.skipCertVerify
		this.network = raw.network
		this.wsPath = raw.wsPath
	}
}

export class Shadowsocks extends BaseProxy {
	server=''
	port=0
	password=''
	cipher=''

	udp:boolean|undefined=undefined

	constructor(raw:any) {
		super(raw)

		this.type = ProxyType.Shadowsocks

		this.server = raw.server
		this.port = raw.port
		this.password = raw.password
		this.cipher = raw.cipher

		this.udp = raw.udp
	}
}

export class Socks5 extends BaseProxy {
	server=''
	port=0

	username:string|undefined=undefined
	password:string|undefined=undefined
	tls:boolean|undefined=undefined
	skipCertVerify:boolean|undefined=undefined
	udp:boolean|undefined=undefined

	constructor(raw:any) {
		super(raw)

		this.type = ProxyType.Socks5

		this.server = raw.server
		this.port = raw.port

		this.username = raw.username
		this.password = raw.password
		this.tls = raw.tls
		this.skipCertVerify = raw.skipCertVerify
		this.udp = raw.udp
	}
}

export class Http extends BaseProxy {
	server=''
	port=0

	username:string|undefined=undefined
	password:string|undefined=undefined
	tls:boolean|undefined=undefined
	skipCertVerify:boolean|undefined=undefined
	udp:boolean|undefined=undefined

	constructor(raw:any) {
		super(raw)

		this.type = ProxyType.Http

		this.server = raw.server
		this.port = raw.port

		this.username = raw.username
		this.password = raw.password
		this.tls = raw.tls
		this.skipCertVerify = raw.skipCertVerify
		this.udp = raw.udp
	}
}

export class Trojan extends BaseProxy {
	server=''
	port=0
	password=''

	sni:string|undefined=undefined
	skipCertVerify:boolean|undefined=undefined
	udp:boolean|undefined=undefined

	constructor(raw:any) {
		super(raw)

		this.type = ProxyType.Trojan

		this.server = raw.server
		this.port = raw.port
		this.password = raw.password

		this.sni = raw.sni
		this.skipCertVerify = raw.skipCertVerify
		this.udp = raw.udp
	}
}
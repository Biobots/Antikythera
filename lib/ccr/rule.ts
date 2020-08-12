//enum PayloadType {
//	Normal,
//	NoResolve,
//}

export class Rule {
	prefix:string
	suffix:string
	raw:string

	constructor(raw:string) {
		const str:Array<string> = raw.split(',')
		if (str.length > 2) {
			this.prefix = str[0]+','+str[1]
			this.suffix = str[2]
			this.raw = raw
		}
		else if (str.length < 2) {
			this.prefix = 'IP-CIDR,'+str[0]
			this.raw = raw
			this.suffix = ''
		}
		else {
			this.prefix = raw
			this.suffix = ''
			this.raw = raw
		}
	}

	getRaw(strategy:string): string {
		if (this.suffix === '') return this.prefix+','+strategy
		else return this.prefix+','+strategy+','+this.suffix
	}
}

export class RuleGroup {
	name:string
	prior:number
	payload:Rule[]

	constructor(name:string, prior:number, payload:Rule[]) {
		this.name = name
		this.prior = prior
		this.payload = payload
	}

	getRaw(): string[] {
		return this.payload.map(p => p.getRaw(this.name))
	}
}
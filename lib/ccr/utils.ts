export function check(item:unknown): boolean {
	return (typeof(item)!='undefined' && item != null)
}
export function getKey<K>(m: Map<K, any>, val: any): K
export function getKey(m: Record<string, any>, val: any): string
export function getKey(m: any, val: any): any {
	for (const [key, value] of m.entries()) {
		if (value === val) return key
	}
}

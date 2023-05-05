export function toISOStringDate(d?: Date | null) {
	if (typeof d === 'undefined' || d === null) {
		d = new Date()
	}
	const offset = d.getTimezoneOffset()
	d = new Date(d.getTime() - offset * 60 * 1000)
	return d.toISOString().slice(0, 10)
}

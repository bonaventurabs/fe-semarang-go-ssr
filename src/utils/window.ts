export const getWindow = (): Window | null =>
	typeof window !== 'undefined' ? window : null

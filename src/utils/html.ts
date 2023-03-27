import DOMPurify from 'dompurify'
import parse from 'html-react-parser'

// export function replaceNode() {}

export default function html(html: string | Node, opts = {}) {
	return parse(DOMPurify.sanitize(html), {
		...{
			// replace: replaceNode,
		},
		...opts,
	})
}

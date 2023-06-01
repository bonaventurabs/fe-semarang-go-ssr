// import classnames from 'classnames'

import ReactPaginate, { type ReactPaginateProps } from 'react-paginate'

import styles from './Pagination.module.scss'
import { NextIcon, PrevIcon } from '../icon/SVGIcon'

interface Props {
	onPageChange?: (selectedItem: { selected: number }) => void
	onPageActive?: (selectedItem: { selected: number }) => void
	totalItem?: number
	itemsPerPage: number
	className?: string
	ref?: React.LegacyRef<React.Component<ReactPaginateProps, unknown>>
	pageCount?: number
	initialPage?: number
}

const Pagination = ({
	onPageChange,
	onPageActive,
	totalItem = 10,
	itemsPerPage,
	className,
	ref,
	pageCount,
	initialPage,
}: Props) => {
	pageCount ??= Math.ceil(totalItem / itemsPerPage)
	return (
		<ReactPaginate
			initialPage={initialPage}
			onPageChange={onPageChange}
			onPageActive={onPageActive}
			pageRangeDisplayed={3}
			marginPagesDisplayed={1}
			pageCount={pageCount}
			nextLabel={<NextIcon />}
			previousLabel={<PrevIcon />}
			pageClassName={styles.paginationItem}
			pageLinkClassName={styles.paginationLink}
			previousClassName={`${styles.arrow} ${styles.prev}`}
			previousLinkClassName={styles.paginationLink}
			nextClassName={`${styles.arrow} ${styles.next}`}
			nextLinkClassName={styles.paginationLink}
			disabledClassName={styles.disabled}
			breakLabel="..."
			activeClassName={styles.selected}
			breakClassName={styles.paginationItem}
			breakLinkClassName={styles.paginationLink}
			containerClassName={`${styles.paginationContainer} ${className ?? ''}`}
			renderOnZeroPageCount={() => null}
			ref={ref}
		/>
	)
}

export default Pagination

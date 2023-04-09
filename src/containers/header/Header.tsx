import { useState, useEffect, useCallback } from 'react'

import { type Url } from 'next/dist/shared/lib/router/router'
import { useRouter } from 'next/navigation'

import Dialog from '@/components/dialog/Dialog'
import { BackIcon, InfoIcon } from '@/components/icon/SVGIcon'

import styles from './Header.module.scss'

const Header = ({
	title,
	backTo,
	isBackButtonDisplayed = true,
	isInfoButtonDisplayed = false,
	onInfoButtonClick,
	shouldConfirmLeave = false,
}: {
	title?: string
	backTo?: Url | number
	isBackButtonDisplayed?: boolean
	isInfoButtonDisplayed?: boolean
	onInfoButtonClick?: React.MouseEventHandler
	shouldConfirmLeave?: boolean
}) => {
	const router = useRouter()
	const [isBackConfirmDialogOpen, setIsBackConfirmDialogOpen] = useState(false)
	const [isContinueToNextPage, setIsContinueToNextPage] = useState(false)

	const handleBackClick = useCallback(async () => {
		if (backTo && !(typeof backTo === 'number')) {
			router.push(backTo as string)
		} else if (backTo && typeof backTo === 'number') {
			history.go(backTo)
		} else if (history.length > 1) {
			router.back()
		} else {
			router.push('/')
		}
	}, [backTo, router])

	const handleBackConfirmDialog = () => {
		setIsBackConfirmDialogOpen(true)
	}

	const backConfirmDialog = () => {
		return (
			<Dialog
				title="Perhatian!"
				description="Apakah Anda yakin untuk kembali ke beranda? Data yang Anda isi dan belum dikirimkan akan terhapus dan Anda harus melakukan kembali proses yang dilakukan."
				confirmLabel="Kembali ke Beranda"
				cancelLabel="Batal"
				isOpen={isBackConfirmDialogOpen}
				onConfirm={handleContinueToNextPage}
				onCancel={handleCancelBackConfirmDialog}
			/>
		)
	}

	const handleContinueToNextPage = () => {
		setIsContinueToNextPage(true)
		setIsBackConfirmDialogOpen(false)
	}

	const handleCancelBackConfirmDialog = () => {
		setIsBackConfirmDialogOpen(false)
	}

	useEffect(() => {
		if (isContinueToNextPage) {
			void handleBackClick()
			setIsContinueToNextPage(!isContinueToNextPage)
		}
	}, [handleBackClick, isContinueToNextPage])

	return (
		<header className={styles.headerWrapper}>
			<div className={styles.wrapper}>
				{isBackButtonDisplayed && (
					<BackIcon
						className={`${styles.icon} ${styles.iconBack}`}
						onClick={
							shouldConfirmLeave ? handleBackConfirmDialog : handleBackClick
						}
					/>
				)}
				{shouldConfirmLeave && backConfirmDialog()}
				{/* {shouldConfirmLeave && <LeaveConfirmDialog shouldConfirmLeave />} */}
				{title && <h3>{title}</h3>}
			</div>
			{isInfoButtonDisplayed && (
				<InfoIcon className={styles.icon} onClick={onInfoButtonClick} />
			)}
		</header>
	)
}
export default Header

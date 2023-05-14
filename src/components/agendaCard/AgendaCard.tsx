import { useState } from 'react'

import dynamic from 'next/dynamic'
import ContentLoader from 'react-content-loader'

import styles from './AgendaCard.module.scss'
import { CategoryIcon, DateIcon, LocationIcon, TimeIcon } from '../icon/SVGIcon'

const BottomSheet = dynamic(
	async () => await import('../bottomSheet/BottomSheet'),
	{
		ssr: false,
	},
)

const Tag = ({ startTime, endTime }: { startTime: Date; endTime?: Date }) => {
	const currentTime = new Date()
	const numOfHours = 1
	if (endTime === undefined) {
		endTime = new Date(startTime.getTime() + numOfHours * 60 * 60 * 1000)
	}
	switch (true) {
		case currentTime < startTime:
			return (
				<div className={`${styles.tag} ${styles.tagSoon}`}>
					<span className={`${styles.tagText}`}>Akan Datang</span>
				</div>
			)
		case currentTime >= startTime && currentTime <= endTime:
			return (
				<div className={`${styles.tag} ${styles.tagOnGoing}`}>
					<span className={`${styles.tagText}`}>Sedang Berlangsung</span>
				</div>
			)
		case currentTime > endTime:
			return (
				<div className={`${styles.tag} ${styles.tagFinished}`}>
					<span className={`${styles.tagText}`}>Selesai</span>
				</div>
			)
		default:
			return null
	}
}

interface AgendaCardProps {
	title: string
	time: Date
	location: string
	category?: string
	isDateDisplayed?: boolean
}

const AgendaCard = ({
	title,
	time,
	location,
	category = 'PemKot Semarang',
	isDateDisplayed = true,
}: AgendaCardProps) => {
	const [isOpen, setOpen] = useState(false)
	const dateValue = time.toLocaleDateString('id-ID', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
	const timeValue =
		time.toLocaleTimeString('id-ID', {
			hour: '2-digit',
			minute: '2-digit',
		}) + ' WIB'
	return (
		<>
			<div className={styles.agendaCard} onClick={() => setOpen(true)}>
				<Tag startTime={time} />
				<div className={styles.title}>{title}</div>
				{isDateDisplayed && (
					<div className={styles.dateTimeWrapper}>
						<DateIcon className={styles.icon} />
						<span className={styles.dateTime}>{dateValue}</span>
					</div>
				)}
				<div className={styles.dateTimeWrapper}>
					<TimeIcon className={styles.icon} />
					<span className={styles.dateTime}>{timeValue}</span>
				</div>
				<div className={styles.locWrapper}>
					<LocationIcon className={styles.icon} />
					<p className={styles.location}>{location}</p>
				</div>
			</div>
			<BottomSheet
				isOpen={isOpen}
				onClose={() => setOpen(false)}
				initialDrawerDistanceTop={350}
			>
				<div className={styles.agendaModal}>
					<div className={styles.titleWrapper}>
						<Tag startTime={time} />
						<h3 className={styles.title}>{title}</h3>
					</div>
					<div className={styles.contentWrapper}>
						<div className={styles.contentItem}>
							<DateIcon />
							<div className={styles.contentText}>
								<span className={styles.attribute}>Tanggal Kegiatan</span>
								<span className={styles.value}>{dateValue}</span>
							</div>
						</div>
						<div className={styles.contentItem}>
							<TimeIcon />
							<div className={styles.contentText}>
								<span className={styles.attribute}>Jam Mulai</span>
								<span className={styles.value}>{timeValue}</span>
							</div>
						</div>
						<div className={styles.contentItem}>
							<CategoryIcon />
							<div className={styles.contentText}>
								<span className={styles.attribute}>Kategori Kegiatan</span>
								<span className={styles.value}>{category}</span>
							</div>
						</div>
						<div className={styles.contentItem}>
							<LocationIcon />
							<div className={styles.contentText}>
								<span className={styles.attribute}>Lokasi Kegiatan</span>
								<span className={styles.value}>{location}</span>
							</div>
						</div>
					</div>
				</div>
			</BottomSheet>
		</>
	)
}

export default AgendaCard

export const AgendaCardSkeleton = ({ ...props }) => (
	<ContentLoader
		speed={2}
		style={{ width: '100%', height: 125 }}
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		uniqueKey="agenda-card-skeleton"
		{...props}
	>
		<rect x="13" y="11" rx="8" ry="8" width="70" height="30" />
		<rect x="13" y="47" rx="3" ry="3" width="381" height="14" />
		<circle cx="26" cy="82" r="13" />
		<rect x="53" y="76" rx="3" ry="3" width="178" height="10" />
		<circle cx="26" cy="112" r="13" />
		<rect x="53" y="107" rx="3" ry="3" width="178" height="10" />
	</ContentLoader>
)

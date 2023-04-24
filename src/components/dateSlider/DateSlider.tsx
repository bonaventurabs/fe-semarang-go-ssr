import React, {
	type LegacyRef,
	forwardRef,
	useEffect,
	useState,
	useCallback,
} from 'react'

import { endOfISOWeek, startOfISOWeek } from 'date-fns'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './DateSlider.module.scss'
import DatePicker from '../datePicker/DatePicker'
import { NextIcon, PrevIcon } from '../icon/SVGIcon'
import 'swiper/scss'

const DateCard = ({
	date,
	isBulletDisplayed,
	onClick,
	active,
}: {
	date: Date
	isBulletDisplayed: boolean
	onClick?: (date: Date) => void
	active: boolean
}) => {
	const handleClick = () => {
		if (onClick) {
			onClick(date)
		}
	}

	return (
		<div
			className={`${styles.dateCard} ${active ? styles.dateCardActive : ''}`}
			onClick={handleClick}
		>
			<div
				className={`${styles.dateWrapper} ${
					active ? styles.dateCardActive : ''
				}`}
			>
				<span className={styles.date}>
					{date.toLocaleString('id-ID', { weekday: 'long' })}
				</span>
				<span className={styles.day}>{date.getDate()}</span>
			</div>
			<div
				className={`${styles.bullet} ${
					isBulletDisplayed ? styles.bulletDisplayed : ''
				} ${isBulletDisplayed && active ? styles.bulletActive : ''}`}
			/>
		</div>
	)
}

interface DateSliderProps {
	value: Date | undefined | null
	onChange: (date: Date | null) => void
}

const DateSlider = ({ value, onChange }: DateSliderProps) => {
	const [date, setDate] = useState<Date | undefined | null>(value ?? new Date())
	const [startDate, setStartDate] = useState(startOfISOWeek(date ?? new Date()))
	const [endDate, setEndDate] = useState(endOfISOWeek(date ?? new Date()))
	const weekTime = 7 * 24 * 60 * 60 * 1000

	const handleDateClick = (date: Date) => {
		setDate(date)
	}

	const handleNextWeekClick = useCallback(() => {
		if (typeof date !== 'undefined' && date !== null) {
			setDate(new Date(date.getTime() + weekTime))
		} else {
			setDate(new Date(new Date().getTime() + weekTime))
		}
	}, [date, weekTime])

	const handlePrevWeekClick = useCallback(() => {
		if (typeof date !== 'undefined' && date !== null) {
			setDate(new Date(date.getTime() - weekTime))
		} else {
			setDate(new Date(new Date().getTime() - weekTime))
		}
	}, [date, weekTime])

	const SelectedWeek = forwardRef(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		({ onClick }: { onClick: any }, ref: LegacyRef<HTMLSpanElement>) => (
			<span className={styles.selectedWeek} ref={ref} onClick={onClick}>
				{`${startDate.getDate()} - ${endDate.toLocaleString('id-ID', {
					day: 'numeric',
					month: 'long',
					year: 'numeric',
				})}`}
			</span>
		),
	)
	SelectedWeek.displayName = 'SelectedWeek'

	useEffect(() => {
		if (typeof date !== 'undefined' && date !== null) {
			setStartDate(startOfISOWeek(date))
			setEndDate(endOfISOWeek(date))
		}
	}, [date])

	useEffect(() => {
		if (typeof date !== 'undefined') {
			onChange(date)
		}
	}, [date, onChange])

	return (
		<div className={styles.dateComponent}>
			<div className={styles.weeklyWrapper}>
				<PrevIcon onClick={handlePrevWeekClick} />
				<DatePicker
					value={date}
					onChange={setDate}
					customInput={<SelectedWeek onClick={undefined} />}
				/>
				<NextIcon onClick={handleNextWeekClick} />
			</div>
			<div className={styles.sliderWrapper}>
				<Swiper
					spaceBetween={10}
					effect="slide"
					slidesPerView="auto"
					className={styles.slider}
					breakpoints={{
						520: {
							spaceBetween: 20,
						},
					}}
				>
					{Array.from({ length: 7 }, (_, i) => {
						const d = new Date(startDate)
						d.setDate(startDate.getDate() + i)
						const now = new Date()
						return (
							<SwiperSlide key={i} style={{ width: 'fit-content' }}>
								<DateCard
									date={d}
									onClick={handleDateClick}
									active={
										d.getDate() === date?.getDate() &&
										d.getMonth() === date.getMonth()
									}
									isBulletDisplayed={
										d.getDate() === now.getDate() &&
										d.getMonth() === now.getMonth()
									}
								/>
							</SwiperSlide>
						)
					})}
				</Swiper>
			</div>
		</div>
	)
}
export default DateSlider

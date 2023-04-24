import { type SyntheticEvent } from 'react'

import id from 'date-fns/locale/id'
// eslint-disable-next-line import/no-named-default
import { default as DatePickerLib, registerLocale } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import styles from './DatePicker.module.scss'
registerLocale('id', id)

interface DatePickerProps {
	value?: Date | null
	onChange: (date: Date | null, event?: SyntheticEvent<unknown>) => void
	customInput?: React.ReactNode
}

const DatePicker = ({ value, onChange, customInput }: DatePickerProps) => {
	return (
		<DatePickerLib
			portalId="root-portal"
			locale="id"
			selected={value}
			onChange={onChange}
			customInput={customInput}
			popperProps={{
				strategy: 'fixed',
				flip: { behavior: ['bottom'] },
				preventOverflow: { enabled: false },
				hide: { enabled: false },
			}}
			className={styles.calendarWrapper}
			// popperClassName={styles.calendar}
			calendarClassName={styles.calendar}
			// dayClassName={styles.calendar}
			// weekDayClassName={}
			// monthClassName={}
		/>
	)
}
export default DatePicker

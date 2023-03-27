import { type SyntheticEvent } from 'react'

// eslint-disable-next-line import/no-named-default
import { default as DatePickerLib } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

interface DatePickerProps {
	value?: Date | null
	onChange: (date: Date | null, event?: SyntheticEvent<unknown>) => void
}

const DatePicker = ({ value, onChange }: DatePickerProps) => {
	return <DatePickerLib selected={value} onChange={onChange} />
}
export default DatePicker

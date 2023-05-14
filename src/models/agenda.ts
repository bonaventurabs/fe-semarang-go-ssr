export interface AgendaType {
	title: string
	scheduleDate: string
	scheduleTime: string
	location: string
}

export interface AgendaResponseData {
	data: AgendaType[]
	status: number
}

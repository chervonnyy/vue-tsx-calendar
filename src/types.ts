interface PlannedEvent {
	id: number,
	body: string,
	completed: boolean,
	date: number
}

interface Todo {
	id: number,
	title: string,
	completed: boolean
}

export { PlannedEvent, Todo };

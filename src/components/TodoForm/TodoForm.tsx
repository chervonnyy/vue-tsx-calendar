import { Component, Prop } from 'vue-property-decorator';
import { VueComponent } from '../../shims-vue';
import { useStore } from 'vuex-simple';
import MyStore from '@/store/store';
import { PlannedEvent } from '@/types';

import EventItem from '../EventItem/EventItem';
import styles from './TodoForm.css?module'; 

@Component
export default class TodoForm extends VueComponent {

	public store: MyStore = useStore(this.$store);

	// not sure which type it is
	handleChange(event: any): void {
		this.store.addNewEvent(event.target.value);
		event.target.value = '';
	}

	render() {
		const events: Array<PlannedEvent> = this.store.plansForTheDay;
		// also didn't find what should I do with this nested components
		const todos: Array<JSX.Element> = events.map((todo: PlannedEvent) => (
			<EventItem data={todo} />
		));

		return (
			<div class={styles.container}>
				<h2 class={styles.title}>События</h2>
				{...todos}
				<input type="text" placeholder="Новое событие" class={styles.input} onchange={this.handleChange} />
			</div>
		);
	}
}

import { Component, Vue } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
import MyStore from '@/store/store';
import Calendar from './components/Calendar/Calendar';
import TodoForm from './components/TodoForm/TodoForm';

import styles from './App.css?module'; 
@Component
export default class App extends Vue {

	public store: MyStore = useStore(this.$store);

	mounted() {
		this.store.getEvents();
	}

	render() {
		return (
			<div id="app" class={styles.app}>
				<Calendar />
				<TodoForm />
			</div>
		)
	}
}

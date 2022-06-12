import { Component, Prop } from 'vue-property-decorator';
import { useStore } from 'vuex-simple';
import { VueComponent } from '../../shims-vue';
import MyStore from '@/store/store';
import { PlannedEvent } from '@/types';

import styles from './EventItem.css?module';

@Component
export default class EventItem extends VueComponent<{ data: PlannedEvent }> {
	
  @Prop() private data!: PlannedEvent;
  
  public store: MyStore = useStore(this.$store);

  get classNames() {
    const classNames = [styles.event];
    this.data.completed && classNames.push(styles.completed);
    return classNames;
  }

  handleChange(): void {
    this.store.changeEventStatus(this.data.id);
  }

  render() {
    return (
      <div class={this.classNames}>
        <input
          type="checkbox"
          id={this.data.id}
          class={styles.complete}
          onChange={this.handleChange}
          checked={this.data.completed}
        />
        <span class={styles.description}>
          {this.data.body}
        </span>
      </div>
    );
  }
}

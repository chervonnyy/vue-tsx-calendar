import Vue from 'vue';

type CSSClass = (string | {
    [key: string]: string
})

// eslint-disable-next-line @typescript-eslint/ban-types
export class VueComponent<Props = {}> extends Vue {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public $props: Props & {
        key?: string
        class?: CSSClass | CSSClass[]
    };
}

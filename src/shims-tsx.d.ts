import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = Vue
    // eslint-disable-next-line @typescript-eslint/ban-types
    interface ElementAttributesProperty { $props: {} }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

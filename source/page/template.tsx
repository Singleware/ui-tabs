/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as DOM from '@singleware/jsx';
import * as Control from '@singleware/ui-control';

import { Properties } from './properties';
import { Element } from './element';
import { States } from './states';

/**
 * Tabs page template class.
 */
@Class.Describe()
export class Template extends Control.Component<Properties> {
  /**
   * Tab page states.
   */
  @Class.Private()
  private states = {
    index: this.properties.index || 0,
    name: '',
    value: void 0,
    disabled: false
  } as States;

  /**
   * Caption slot.
   */
  @Class.Private()
  private captionSlot = (
    <slot name="caption" class="caption">
      <div>Empty caption</div>
    </slot>
  ) as HTMLSlotElement;

  /**
   * Content slot.
   */
  @Class.Private()
  private contentSlot = (
    <slot name="content" class="content">
      <div>Empty content</div>
    </slot>
  ) as HTMLSlotElement;

  /**
   * Tab page styles.
   */
  @Class.Private()
  private styles = (
    <style>
      {`:host {
  display: flex;
  flex-direction: column;
}
:host > .caption {
  display: none;
}`}
    </style>
  ) as HTMLStyleElement;

  /**
   * Tab page skeleton.
   */
  @Class.Private()
  private skeleton = (
    <div slot="content" class={this.properties.class}>
      {this.children}
    </div>
  ) as Element;

  /**
   * Updates the specified property state.
   * @param property Property name.
   * @param state Property state.
   */
  @Class.Private()
  private updatePropertyState(property: string, state: boolean): void {
    if (state) {
      this.skeleton.dataset[property] = 'on';
    } else {
      delete this.skeleton.dataset[property];
    }
  }

  /**
   * Bind exposed properties to the custom element.
   */
  @Class.Private()
  private bindProperties(): void {
    this.bindComponentProperties(this.skeleton, ['index', 'name', 'value', 'disabled', 'caption']);
  }

  /**
   * Assign all element properties.
   */
  @Class.Private()
  private assignProperties(): void {
    this.assignComponentProperties(this.properties, ['name', 'value', 'disabled']);
    this.states.caption = (this.captionSlot.assignedNodes({ flatten: true }) as HTMLElement[])[0];
  }

  /**
   * Default constructor.
   * @param properties Page properties.
   * @param children Page children.
   */
  constructor(properties?: Properties, children?: any[]) {
    super(properties, children);
    DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.captionSlot, this.contentSlot);
    this.bindProperties();
    this.assignProperties();
  }

  /**
   * Gets the page index.
   */
  @Class.Public()
  public get index(): number {
    return this.states.index;
  }

  /**
   * Gets the page name.
   */
  @Class.Public()
  public get name(): string {
    return this.states.name;
  }

  /**
   * Sets the page name.
   */
  public set name(name: string) {
    this.states.name = name;
  }

  /**
   * Gets the page value.
   */
  @Class.Public()
  public get value(): any {
    return this.states.value;
  }

  /**
   * Sets the page value.
   */
  public set value(value: any) {
    this.states.value = value;
  }

  /**
   * Gets the disabled state.
   */
  @Class.Public()
  public get disabled(): boolean {
    return this.states.disabled;
  }

  /**
   * Sets the disabled state.
   */
  public set disabled(state: boolean) {
    this.updatePropertyState('disabled', (this.states.disabled = state));
    Control.setChildrenProperty(this.contentSlot, 'disabled', state);
  }

  /**
   * Gets the page caption element.
   */
  @Class.Public()
  public get caption(): HTMLElement {
    return this.states.caption;
  }

  /**
   * Tab page element.
   */
  @Class.Public()
  public get element(): Element {
    return this.skeleton;
  }
}

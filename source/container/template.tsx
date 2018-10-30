/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Class from '@singleware/class';
import * as DOM from '@singleware/jsx';
import * as Control from '@singleware/ui-control';

import * as Page from '../page';

import { Properties } from './properties';
import { Element } from './element';
import { States } from './states';
import { Tab } from './tab';

/**
 * Tabs container, template class.
 */
@Class.Describe()
export class Template<T extends Properties = Properties> extends Control.Component<T> {
  /**
   * Tab container states.
   */
  @Class.Private()
  private states = {
    name: '',
    unwind: false,
    required: false,
    readOnly: false,
    disabled: false
  } as States;

  /**
   * Selected tab.
   */
  @Class.Private()
  private selectedTab?: Tab;

  /**
   * Map of tab elements.
   */
  @Class.Private()
  private matchedTabs = new WeakMap<HTMLElement, Tab>();

  /**
   * Caption slot.
   */
  @Class.Private()
  private captionSlot = <slot name="caption" class="caption" /> as HTMLSlotElement;

  /**
   * Content slot.
   */
  @Class.Private()
  private contentSlot = <slot name="content" class="content" /> as HTMLSlotElement;

  /**
   * Tab container styles.
   */
  @Class.Private()
  private styles = (
    <style>
      {`host {
  display: flex;
  flex-direction: column;
}
:host > .caption {
  display: flex;
  flex-direction: row;
}
:host > .caption::slotted(*) {
  padding: 0.25rem 0.5rem;
  text-align: center;
  cursor: pointer;
}
:host > .content::slotted(*) {
  width: 100%;
  overflow: auto;
}`}
    </style>
  ) as HTMLStyleElement;

  /**
   * Tab container skeleton.
   */
  @Class.Private()
  private skeleton = <div slot={this.properties.slot} class={this.properties.class} /> as Element;

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
   * Adds the specified page element.
   * @param caption Caption element.
   * @param content Content element.
   * @returns Returns the page tab information.
   */
  @Class.Private()
  private addPageElement(caption: HTMLElement, content: Page.Element): Tab {
    if (this.matchedTabs.has(caption)) {
      throw new Error(`The specified page already exists in the tab container.`);
    }
    const tab = {
      caption: caption,
      content: content,
      handler: () => {
        this.selectTabHandler(tab);
      }
    };
    caption.addEventListener('click', tab.handler);
    this.matchedTabs.set(caption, tab);
    return tab;
  }

  /**
   * Removes the specified page element.
   * @param caption Caption element.
   */
  @Class.Private()
  private removePageElement(caption: HTMLElement): void {
    const tab = this.matchedTabs.get(caption) as Tab;
    tab.caption.removeEventListener('click', tab.handler);
    tab.caption.remove();
    tab.content.remove();
  }

  /**
   * Select tab handler.
   * @param tab Tab information.
   */
  @Class.Private()
  private selectTabHandler(tab: Tab): void {
    if (!this.disabled) {
      if (this.selectedTab) {
        delete this.selectedTab.caption.dataset.active;
        delete this.selectedTab.content.dataset.active;
        this.selectedTab.content.remove();
      }
      this.selectedTab = tab;
      this.selectedTab.caption.dataset.active = 'on';
      this.selectedTab.content.dataset.active = 'on';
      this.skeleton.appendChild(tab.content);

      Control.listChildrenByType(this.contentSlot, HTMLElement, (field: any) => {
        if ('required' in field) {
          field.required = this.states.required;
        }
        if ('readOnly' in field) {
          field.readOnly = this.states.readOnly;
        }
        if ('disabled' in field) {
          field.disabled = this.states.disabled;
        }
      });
    }
  }

  /**
   * Bind all captions with its handlers into this custom element.
   */
  @Class.Private()
  private bindCaptions(): void {
    for (const page of this.children as Page.Element[]) {
      if (page instanceof HTMLElement) {
        const selected = this.properties.selectIndex === page.index || this.properties.selectName === page.name;
        this.addPage(page, selected);
      }
    }
  }

  /**
   * Bind exposed properties to the custom element.
   */
  @Class.Private()
  private bindProperties(): void {
    this.bindComponentProperties(this.skeleton, [
      'name',
      'value',
      'unwind',
      'empty',
      'selected',
      'required',
      'readOnly',
      'disabled',
      'addPage',
      'insertPage',
      'removePage',
      'clear'
    ]);
  }

  /**
   * Assign all element properties.
   */
  @Class.Private()
  private assignProperties(): void {
    this.assignComponentProperties(this.properties, ['name', 'value', 'unwind', 'required', 'readOnly', 'disabled']);
  }

  /**
   * Default constructor.
   * @param properties Container properties.
   * @param children Container children.
   */
  constructor(properties?: T, children?: any[]) {
    super(properties, children);
    DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.captionSlot, this.contentSlot);
    this.bindCaptions();
    this.bindProperties();
    this.assignProperties();
  }

  /**
   * Gets the container name.
   */
  @Class.Public()
  public get name(): string {
    return this.states.name;
  }

  /**
   * Sets the container name.
   */
  public set name(name: string) {
    this.states.name = name;
  }

  /**
   * Gets the value entity.
   */
  @Class.Public()
  public get value(): any {
    const entity = {} as any;
    Control.listChildrenByProperty(this.contentSlot, 'value', (field: any) => {
      if (!('empty' in field) || !field.empty) {
        if ('unwind' in field && field.unwind === true) {
          const values = field.value;
          for (const name in values) {
            if (values[name] !== void 0) {
              entity[name] = values[name];
            }
          }
        } else if ('name' in field && field.name) {
          const value = field.value;
          if (value !== void 0) {
            entity[field.name] = value;
          }
        }
      }
    });
    return entity;
  }

  /**
   * Sets the value entity.
   */
  public set value(entity: any) {
    Control.listChildrenByProperty(this.contentSlot, 'value', (field: any) => {
      if ('unwind' in field && field.unwind === true) {
        field.value = entity;
      } else if ('name' in field && field.name in entity) {
        field.value = entity[field.name];
        delete entity[field.name];
      }
    });
  }

  /**
   * Gets the unwind state.
   */
  @Class.Public()
  public get unwind(): boolean {
    return this.states.unwind;
  }

  /**
   * Sets the unwind state.
   */
  public set unwind(state: boolean) {
    this.states.unwind = state;
  }

  /**
   * Gets the empty state.
   */
  @Class.Public()
  public get empty(): boolean {
    return (
      Control.listChildrenByProperty(this.contentSlot, 'value', (field: any) => {
        return 'empty' in field && !field.empty ? true : void 0;
      }) !== true
    );
  }

  /**
   * Gets the selected page element.
   */
  @Class.Public()
  public get selected(): Page.Element | undefined {
    return this.selectedTab ? this.selectedTab.content : void 0;
  }

  /**
   * Gets the required state.
   */
  @Class.Public()
  public get required(): boolean {
    return this.states.required;
  }

  /**
   * Sets the required state.
   */
  public set required(state: boolean) {
    this.states.required = state;
    this.updatePropertyState('required', state);
    Control.setChildrenProperty(this.captionSlot, 'required', state);
    Control.setChildrenProperty(this.contentSlot, 'required', state);
  }

  /**
   * Gets the read-only state.
   */
  @Class.Public()
  public get readOnly(): boolean {
    return this.states.readOnly;
  }

  /**
   * Sets the read-only state.
   */
  public set readOnly(state: boolean) {
    this.states.readOnly = state;
    this.updatePropertyState('readOnly', state);
    Control.setChildrenProperty(this.captionSlot, 'readOnly', state);
    Control.setChildrenProperty(this.contentSlot, 'readOnly', state);
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
    this.states.disabled = state;
    this.updatePropertyState('disabled', state);
    Control.setChildrenProperty(this.captionSlot, 'disabled', state);
    Control.setChildrenProperty(this.contentSlot, 'disabled', state);
  }

  /**
   * Tab container element.
   */
  @Class.Public()
  public get element(): Element {
    return this.skeleton;
  }

  /**
   * Checks the tab validity.
   * @returns Returns true when the tab is valid, false otherwise.
   */
  @Class.Public()
  public checkValidity(): boolean {
    return (
      Control.listChildrenByProperty(this.contentSlot, 'checkValidity', (field: any) => {
        return field.checkValidity() ? void 0 : false;
      }) !== false
    );
  }

  /**
   * Reports the tab validity.
   * @returns Returns true when the tab is valid, false otherwise.
   */
  @Class.Public()
  public reportValidity(): boolean {
    return (
      Control.listChildrenByProperty(this.contentSlot, 'reportValidity', (field: any) => {
        return field.reportValidity() ? void 0 : false;
      }) !== false
    );
  }

  /**
   * Adds the specified page into this container.
   * @param page Page element.
   * @param select Determines whether the page must be selected or not.
   * @throws Throws an error when the specified tab already exists in the tab container.
   */
  @Class.Public()
  public addPage(page: Page.Element, select: boolean): void {
    const tab = this.addPageElement(page.caption, page);
    this.skeleton.appendChild(page.caption);
    if (!this.selectedTab || select) {
      this.selectTabHandler(tab);
    }
  }

  /**
   * Inserts the specified page  into this container before the given offset page.
   * @param page Page element.
   * @param offset Offset page element.
   * @param selected Determines whether the page must be selected or not.
   * @throws Throws an error when the offset page does not exists in the tab container.
   */
  @Class.Public()
  public insertPage(page: Page.Element, offset: Page.Element, selected: boolean): void {
    const tab = this.addPageElement(page.caption, page);
    this.skeleton.insertBefore(page.caption, offset.caption);
    if (!this.selectedTab || selected) {
      this.selectTabHandler(tab);
    }
  }

  /**
   * Removes the specified page from this tab container.
   * @param page Page element.
   * @throws Throws an error when the specified page does not exists in this tab container.
   */
  @Class.Public()
  public removePage(page: Page.Element): void {
    if (!this.matchedTabs.has(page.caption)) {
      throw new Error(`The specified page does not exists in the tab container.`);
    }
    this.removePageElement(page.caption);
  }

  /**
   * Remove all pages.
   */
  @Class.Public()
  public clear(): void {
    Control.listChildrenByType(this.captionSlot, HTMLElement, (caption: HTMLElement) => {
      this.removePageElement(caption);
    });
  }

  /**
   * Reset all tab fields to its initial values.
   */
  @Class.Public()
  public reset(): void {
    Control.listChildrenByProperty(this.contentSlot, 'reset', (field: any) => {
      field.reset();
    });
  }
}

/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Page from '../page';

/**
 * Tabs container element interface.
 */
export interface Element extends HTMLDivElement {
  /**
   * Container name.
   */
  name: string;
  /**
   * Container value.
   */
  value: any;
  /**
   * Determines whether the container values must be unrolled.
   */
  unwind: boolean;
  /**
   * Determines whether the container is empty or not.
   */
  readonly empty: boolean;
  /**
   * Selected content element.
   */
  readonly selected: Page.Element | undefined;
  /**
   * Required state.
   */
  required: boolean;
  /**
   * Read-only state.
   */
  readOnly: boolean;
  /**
   * Disabled state.
   */
  disabled: boolean;
  /**
   * Checks the tab validity.
   * @returns Returns true when the tab is valid, false otherwise.
   */
  checkValidity(): boolean;
  /**
   * Reports the tab validity.
   * @returns Returns true when the tab is valid, false otherwise.
   */
  reportValidity(): boolean;
  /**
   * Adds the specified page into this container.
   * @param page Page element.
   * @param select Determines whether the page must be selected or not.
   * @throws Throws an error when the specified tab already exists in the tab container.
   */
  addPage(page: Page.Element, select: boolean): void;
  /**
   * Inserts the specified page into this container before the given offset page.
   * @param page Page element.
   * @param offset Offset page element.
   * @param selected Determines whether the page must be selected or not.
   * @throws Throws an error when the offset page does not exists in the tab container.
   */
  insertPage(page: Page.Element, offset: Page.Element, selected: boolean): void;
  /**
   * Removes the specified page from this tab container.
   * @param page Page element.
   * @throws Throws an error when the specified page does not exists in this tab container.
   */
  removePage(page: Page.Element): void;
  /**
   * Remove all pages.
   */
  clear(): void;
  /**
   * Reset all tab fields to its initial values.
   */
  reset(): void;
}

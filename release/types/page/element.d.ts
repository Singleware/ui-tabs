/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Tab page, element interface.
 */
export interface Element extends HTMLDivElement {
  /**
   * Page index.
   */
  readonly index: number;
  /**
   * Page name.
   */
  name: string;
  /**
   * Page value.
   */
  value: any;
  /**
   * Disabled state.
   */
  disabled: boolean;
  /**
   * Page caption.
   */
  readonly caption: HTMLElement;
}

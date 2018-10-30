/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Tab page states interface.
 */
export interface States {
  /**
   * Page index.
   */
  index: number;
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
   * Caption element.
   */
  caption: HTMLElement;
}

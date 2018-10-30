/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Tab page properties interface.
 */
export interface Properties {
  /**
   * Page classes.
   */
  class?: string;
  /**
   * Page index.
   */
  index?: number;
  /**
   * Page name.
   */
  name?: string;
  /**
   * Page value.
   */
  value?: any;
  /**
   * Determines whether the tab page is disabled or not.
   */
  disabled?: boolean;
  /**
   * Page children.
   */
  children?: {};
}

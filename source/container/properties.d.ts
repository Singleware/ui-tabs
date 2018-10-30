/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */

/**
 * Tabs container properties interface.
 */
export interface Properties {
  /**
   * Container classes.
   */
  class?: string;
  /**
   * Container slot.
   */
  slot?: string;
  /**
   * Container name.
   */
  name?: string;
  /**
   * Container value entity.
   */
  value?: any;
  /**
   * Determines whether the tab container values must be unrolled.
   */
  unwind?: boolean;
  /**
   * Determines whether the tab container is required or not.
   */
  required?: boolean;
  /**
   * Determines whether the tab container is read-only or not.
   */
  readOnly?: boolean;
  /**
   * Determines whether the tab container is disabled or not.
   */
  disabled?: boolean;
  /**
   * Selected page name.
   */
  selectName?: string;
  /**
   * Selected page index.
   */
  selectIndex?: number;
  /**
   * Container children.
   */
  children?: {};
}

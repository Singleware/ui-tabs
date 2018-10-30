/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
import * as Page from '../page';

/**
 * Tab interface.
 */
export interface Tab {
  /**
   * Caption element.
   */
  caption: HTMLElement;
  /**
   * Content element.
   */
  content: Page.Element;
  /**
   * Handler callback.
   */
  handler: EventListener;
}

/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to use the basic tabs element.
 */
import * as Tabs from '../source';
import * as DOM from '@singleware/jsx';

const tabs = (
  <Tabs.Container.Template>
    <Tabs.Page.Template>
      <span slot="caption">Caption 1</span>
      <div slot="content">Content 1</div>
    </Tabs.Page.Template>
    <Tabs.Page.Template>
      <span slot="caption">Caption 2</span>
      <div slot="content">Content 2</div>
    </Tabs.Page.Template>
    <Tabs.Page.Template>
      <span slot="caption">Caption 3</span>
      <div slot="content">Content 3</div>
    </Tabs.Page.Template>
  </Tabs.Container.Template>
) as Tabs.Container.Element;

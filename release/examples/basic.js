"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 *
 * The proposal of this example is to show how to use the basic tabs element.
 */
const Tabs = require("../source");
const DOM = require("@singleware/jsx");
const tabs = (DOM.create(Tabs.Container.Template, null,
    DOM.create(Tabs.Page.Template, null,
        DOM.create("span", { slot: "caption" }, "Caption 1"),
        DOM.create("div", { slot: "content" }, "Content 1")),
    DOM.create(Tabs.Page.Template, null,
        DOM.create("span", { slot: "caption" }, "Caption 2"),
        DOM.create("div", { slot: "content" }, "Content 2")),
    DOM.create(Tabs.Page.Template, null,
        DOM.create("span", { slot: "caption" }, "Caption 3"),
        DOM.create("div", { slot: "content" }, "Content 3"))));

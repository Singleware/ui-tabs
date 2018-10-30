"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2018 Silas B. Domingos
 * This source code is licensed under the MIT License as described in the file LICENSE.
 */
const Class = require("@singleware/class");
const DOM = require("@singleware/jsx");
const Control = require("@singleware/ui-control");
/**
 * Tabs page template class.
 */
let Template = class Template extends Control.Component {
    /**
     * Default constructor.
     * @param properties Page properties.
     * @param children Page children.
     */
    constructor(properties, children) {
        super(properties, children);
        /**
         * Tab page states.
         */
        this.states = {
            index: this.properties.index || 0,
            name: '',
            value: void 0,
            disabled: false
        };
        /**
         * Caption slot.
         */
        this.captionSlot = (DOM.create("slot", { name: "caption", class: "caption" },
            DOM.create("div", null, "Empty caption")));
        /**
         * Content slot.
         */
        this.contentSlot = (DOM.create("slot", { name: "content", class: "content" },
            DOM.create("div", null, "Empty content")));
        /**
         * Tab page styles.
         */
        this.styles = (DOM.create("style", null, `:host {
  display: flex;
  flex-direction: column;
}
:host > .caption {
  display: none;
}`));
        /**
         * Tab page skeleton.
         */
        this.skeleton = (DOM.create("div", { slot: "content", class: this.properties.class }, this.children));
        DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.captionSlot, this.contentSlot);
        this.bindProperties();
        this.assignProperties();
    }
    /**
     * Updates the specified property state.
     * @param property Property name.
     * @param state Property state.
     */
    updatePropertyState(property, state) {
        if (state) {
            this.skeleton.dataset[property] = 'on';
        }
        else {
            delete this.skeleton.dataset[property];
        }
    }
    /**
     * Bind exposed properties to the custom element.
     */
    bindProperties() {
        this.bindComponentProperties(this.skeleton, ['index', 'name', 'value', 'disabled', 'caption']);
    }
    /**
     * Assign all element properties.
     */
    assignProperties() {
        this.assignComponentProperties(this.properties, ['name', 'value', 'disabled']);
        this.states.caption = this.captionSlot.assignedNodes({ flatten: true })[0];
    }
    /**
     * Gets the page index.
     */
    get index() {
        return this.states.index;
    }
    /**
     * Gets the page name.
     */
    get name() {
        return this.states.name;
    }
    /**
     * Sets the page name.
     */
    set name(name) {
        this.states.name = name;
    }
    /**
     * Gets the page value.
     */
    get value() {
        return this.states.value;
    }
    /**
     * Sets the page value.
     */
    set value(value) {
        this.states.value = value;
    }
    /**
     * Gets the disabled state.
     */
    get disabled() {
        return this.states.disabled;
    }
    /**
     * Sets the disabled state.
     */
    set disabled(state) {
        this.updatePropertyState('disabled', (this.states.disabled = state));
        Control.setChildrenProperty(this.contentSlot, 'disabled', state);
    }
    /**
     * Gets the page caption element.
     */
    get caption() {
        return this.states.caption;
    }
    /**
     * Tab page element.
     */
    get element() {
        return this.skeleton;
    }
};
__decorate([
    Class.Private()
], Template.prototype, "states", void 0);
__decorate([
    Class.Private()
], Template.prototype, "captionSlot", void 0);
__decorate([
    Class.Private()
], Template.prototype, "contentSlot", void 0);
__decorate([
    Class.Private()
], Template.prototype, "styles", void 0);
__decorate([
    Class.Private()
], Template.prototype, "skeleton", void 0);
__decorate([
    Class.Private()
], Template.prototype, "updatePropertyState", null);
__decorate([
    Class.Private()
], Template.prototype, "bindProperties", null);
__decorate([
    Class.Private()
], Template.prototype, "assignProperties", null);
__decorate([
    Class.Public()
], Template.prototype, "index", null);
__decorate([
    Class.Public()
], Template.prototype, "name", null);
__decorate([
    Class.Public()
], Template.prototype, "value", null);
__decorate([
    Class.Public()
], Template.prototype, "disabled", null);
__decorate([
    Class.Public()
], Template.prototype, "caption", null);
__decorate([
    Class.Public()
], Template.prototype, "element", null);
Template = __decorate([
    Class.Describe()
], Template);
exports.Template = Template;

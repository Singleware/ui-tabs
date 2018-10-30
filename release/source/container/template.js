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
 * Tabs container, template class.
 */
let Template = class Template extends Control.Component {
    /**
     * Default constructor.
     * @param properties Container properties.
     * @param children Container children.
     */
    constructor(properties, children) {
        super(properties, children);
        /**
         * Tab container states.
         */
        this.states = {
            name: '',
            unwind: false,
            required: false,
            readOnly: false,
            disabled: false
        };
        /**
         * Map of tab elements.
         */
        this.matchedTabs = new WeakMap();
        /**
         * Caption slot.
         */
        this.captionSlot = DOM.create("slot", { name: "caption", class: "caption" });
        /**
         * Content slot.
         */
        this.contentSlot = DOM.create("slot", { name: "content", class: "content" });
        /**
         * Tab container styles.
         */
        this.styles = (DOM.create("style", null, `host {
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
}`));
        /**
         * Tab container skeleton.
         */
        this.skeleton = DOM.create("div", { slot: this.properties.slot, class: this.properties.class });
        DOM.append(this.skeleton.attachShadow({ mode: 'closed' }), this.styles, this.captionSlot, this.contentSlot);
        this.bindCaptions();
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
     * Adds the specified page element.
     * @param caption Caption element.
     * @param content Content element.
     * @returns Returns the page tab information.
     */
    addPageElement(caption, content) {
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
    removePageElement(caption) {
        const tab = this.matchedTabs.get(caption);
        tab.caption.removeEventListener('click', tab.handler);
        tab.caption.remove();
        tab.content.remove();
    }
    /**
     * Select tab handler.
     * @param tab Tab information.
     */
    selectTabHandler(tab) {
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
            Control.listChildrenByType(this.contentSlot, HTMLElement, (field) => {
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
    bindCaptions() {
        for (const page of this.children) {
            if (page instanceof HTMLElement) {
                const selected = this.properties.selectIndex === page.index || this.properties.selectName === page.name;
                this.addPage(page, selected);
            }
        }
    }
    /**
     * Bind exposed properties to the custom element.
     */
    bindProperties() {
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
    assignProperties() {
        this.assignComponentProperties(this.properties, ['name', 'value', 'unwind', 'required', 'readOnly', 'disabled']);
    }
    /**
     * Gets the container name.
     */
    get name() {
        return this.states.name;
    }
    /**
     * Sets the container name.
     */
    set name(name) {
        this.states.name = name;
    }
    /**
     * Gets the value entity.
     */
    get value() {
        const entity = {};
        Control.listChildrenByProperty(this.contentSlot, 'value', (field) => {
            if (!('empty' in field) || !field.empty) {
                if ('unwind' in field && field.unwind === true) {
                    const values = field.value;
                    for (const name in values) {
                        if (values[name] !== void 0) {
                            entity[name] = values[name];
                        }
                    }
                }
                else if ('name' in field && field.name) {
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
    set value(entity) {
        Control.listChildrenByProperty(this.contentSlot, 'value', (field) => {
            if ('unwind' in field && field.unwind === true) {
                field.value = entity;
            }
            else if ('name' in field && field.name in entity) {
                field.value = entity[field.name];
                delete entity[field.name];
            }
        });
    }
    /**
     * Gets the unwind state.
     */
    get unwind() {
        return this.states.unwind;
    }
    /**
     * Sets the unwind state.
     */
    set unwind(state) {
        this.states.unwind = state;
    }
    /**
     * Gets the empty state.
     */
    get empty() {
        return (Control.listChildrenByProperty(this.contentSlot, 'value', (field) => {
            return 'empty' in field && !field.empty ? true : void 0;
        }) !== true);
    }
    /**
     * Gets the selected page element.
     */
    get selected() {
        return this.selectedTab ? this.selectedTab.content : void 0;
    }
    /**
     * Gets the required state.
     */
    get required() {
        return this.states.required;
    }
    /**
     * Sets the required state.
     */
    set required(state) {
        this.states.required = state;
        this.updatePropertyState('required', state);
        Control.setChildrenProperty(this.captionSlot, 'required', state);
        Control.setChildrenProperty(this.contentSlot, 'required', state);
    }
    /**
     * Gets the read-only state.
     */
    get readOnly() {
        return this.states.readOnly;
    }
    /**
     * Sets the read-only state.
     */
    set readOnly(state) {
        this.states.readOnly = state;
        this.updatePropertyState('readOnly', state);
        Control.setChildrenProperty(this.captionSlot, 'readOnly', state);
        Control.setChildrenProperty(this.contentSlot, 'readOnly', state);
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
        this.states.disabled = state;
        this.updatePropertyState('disabled', state);
        Control.setChildrenProperty(this.captionSlot, 'disabled', state);
        Control.setChildrenProperty(this.contentSlot, 'disabled', state);
    }
    /**
     * Tab container element.
     */
    get element() {
        return this.skeleton;
    }
    /**
     * Checks the tab validity.
     * @returns Returns true when the tab is valid, false otherwise.
     */
    checkValidity() {
        return (Control.listChildrenByProperty(this.contentSlot, 'checkValidity', (field) => {
            return field.checkValidity() ? void 0 : false;
        }) !== false);
    }
    /**
     * Reports the tab validity.
     * @returns Returns true when the tab is valid, false otherwise.
     */
    reportValidity() {
        return (Control.listChildrenByProperty(this.contentSlot, 'reportValidity', (field) => {
            return field.reportValidity() ? void 0 : false;
        }) !== false);
    }
    /**
     * Adds the specified page into this container.
     * @param page Page element.
     * @param select Determines whether the page must be selected or not.
     * @throws Throws an error when the specified tab already exists in the tab container.
     */
    addPage(page, select) {
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
    insertPage(page, offset, selected) {
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
    removePage(page) {
        if (!this.matchedTabs.has(page.caption)) {
            throw new Error(`The specified page does not exists in the tab container.`);
        }
        this.removePageElement(page.caption);
    }
    /**
     * Remove all pages.
     */
    clear() {
        Control.listChildrenByType(this.captionSlot, HTMLElement, (caption) => {
            this.removePageElement(caption);
        });
    }
    /**
     * Reset all tab fields to its initial values.
     */
    reset() {
        Control.listChildrenByProperty(this.contentSlot, 'reset', (field) => {
            field.reset();
        });
    }
};
__decorate([
    Class.Private()
], Template.prototype, "states", void 0);
__decorate([
    Class.Private()
], Template.prototype, "selectedTab", void 0);
__decorate([
    Class.Private()
], Template.prototype, "matchedTabs", void 0);
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
], Template.prototype, "addPageElement", null);
__decorate([
    Class.Private()
], Template.prototype, "removePageElement", null);
__decorate([
    Class.Private()
], Template.prototype, "selectTabHandler", null);
__decorate([
    Class.Private()
], Template.prototype, "bindCaptions", null);
__decorate([
    Class.Private()
], Template.prototype, "bindProperties", null);
__decorate([
    Class.Private()
], Template.prototype, "assignProperties", null);
__decorate([
    Class.Public()
], Template.prototype, "name", null);
__decorate([
    Class.Public()
], Template.prototype, "value", null);
__decorate([
    Class.Public()
], Template.prototype, "unwind", null);
__decorate([
    Class.Public()
], Template.prototype, "empty", null);
__decorate([
    Class.Public()
], Template.prototype, "selected", null);
__decorate([
    Class.Public()
], Template.prototype, "required", null);
__decorate([
    Class.Public()
], Template.prototype, "readOnly", null);
__decorate([
    Class.Public()
], Template.prototype, "disabled", null);
__decorate([
    Class.Public()
], Template.prototype, "element", null);
__decorate([
    Class.Public()
], Template.prototype, "checkValidity", null);
__decorate([
    Class.Public()
], Template.prototype, "reportValidity", null);
__decorate([
    Class.Public()
], Template.prototype, "addPage", null);
__decorate([
    Class.Public()
], Template.prototype, "insertPage", null);
__decorate([
    Class.Public()
], Template.prototype, "removePage", null);
__decorate([
    Class.Public()
], Template.prototype, "clear", null);
__decorate([
    Class.Public()
], Template.prototype, "reset", null);
Template = __decorate([
    Class.Describe()
], Template);
exports.Template = Template;

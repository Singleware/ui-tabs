import * as Control from '@singleware/ui-control';
import * as Page from '../page';
import { Properties } from './properties';
import { Element } from './element';
/**
 * Tabs container, template class.
 */
export declare class Template<T extends Properties = Properties> extends Control.Component<T> {
    /**
     * Tab container states.
     */
    private states;
    /**
     * Selected tab.
     */
    private selectedTab?;
    /**
     * Map of tab elements.
     */
    private matchedTabs;
    /**
     * Caption slot.
     */
    private captionSlot;
    /**
     * Content slot.
     */
    private contentSlot;
    /**
     * Tab container styles.
     */
    private styles;
    /**
     * Tab container skeleton.
     */
    private skeleton;
    /**
     * Updates the specified property state.
     * @param property Property name.
     * @param state Property state.
     */
    private updatePropertyState;
    /**
     * Adds the specified page element.
     * @param caption Caption element.
     * @param content Content element.
     * @returns Returns the page tab information.
     */
    private addPageElement;
    /**
     * Removes the specified page element.
     * @param caption Caption element.
     */
    private removePageElement;
    /**
     * Select tab handler.
     * @param tab Tab information.
     */
    private selectTabHandler;
    /**
     * Bind all captions with its handlers into this custom element.
     */
    private bindCaptions;
    /**
     * Bind exposed properties to the custom element.
     */
    private bindProperties;
    /**
     * Assign all element properties.
     */
    private assignProperties;
    /**
     * Default constructor.
     * @param properties Container properties.
     * @param children Container children.
     */
    constructor(properties?: T, children?: any[]);
    /**
     * Gets the container name.
     */
    get name(): string;
    /**
     * Sets the container name.
     */
    set name(name: string);
    /**
     * Gets the value entity.
     */
    get value(): any;
    /**
     * Sets the value entity.
     */
    set value(entity: any);
    /**
     * Gets the unwind state.
     */
    get unwind(): boolean;
    /**
     * Sets the unwind state.
     */
    set unwind(state: boolean);
    /**
     * Gets the empty state.
     */
    get empty(): boolean;
    /**
     * Gets the selected page element.
     */
    get selected(): Page.Element | undefined;
    /**
     * Gets the required state.
     */
    get required(): boolean;
    /**
     * Sets the required state.
     */
    set required(state: boolean);
    /**
     * Gets the read-only state.
     */
    get readOnly(): boolean;
    /**
     * Sets the read-only state.
     */
    set readOnly(state: boolean);
    /**
     * Gets the disabled state.
     */
    get disabled(): boolean;
    /**
     * Sets the disabled state.
     */
    set disabled(state: boolean);
    /**
     * Tab container element.
     */
    get element(): Element;
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
     * Inserts the specified page  into this container before the given offset page.
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

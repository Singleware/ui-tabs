import * as Control from '@singleware/ui-control';
import { Properties } from './properties';
import { Element } from './element';
/**
 * Tabs page template class.
 */
export declare class Template extends Control.Component<Properties> {
    /**
     * Tab page states.
     */
    private states;
    /**
     * Caption slot.
     */
    private captionSlot;
    /**
     * Content slot.
     */
    private contentSlot;
    /**
     * Tab page styles.
     */
    private styles;
    /**
     * Tab page skeleton.
     */
    private skeleton;
    /**
     * Updates the specified property state.
     * @param property Property name.
     * @param state Property state.
     */
    private updatePropertyState;
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
     * @param properties Page properties.
     * @param children Page children.
     */
    constructor(properties?: Properties, children?: any[]);
    /**
     * Gets the page index.
     */
    get index(): number;
    /**
     * Gets the page name.
     */
    get name(): string;
    /**
     * Sets the page name.
     */
    set name(name: string);
    /**
     * Gets the page value.
     */
    get value(): any;
    /**
     * Sets the page value.
     */
    set value(value: any);
    /**
     * Gets the disabled state.
     */
    get disabled(): boolean;
    /**
     * Sets the disabled state.
     */
    set disabled(state: boolean);
    /**
     * Gets the page caption element.
     */
    get caption(): HTMLElement;
    /**
     * Tab page element.
     */
    get element(): Element;
}

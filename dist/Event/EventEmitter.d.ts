import { EventSubscriber } from './EventSubscriber';
export declare class EventEmitter {
    private _events;
    private _emitted;
    /**
     * Emits the given callback ONCE as soon as the event fires.
     *
     * @param {string} eventName
     * @param {(...any) => any} callback
     * @return {EventSubscriber}
     */
    once(eventName: string, callback: (...args: any[]) => any): EventSubscriber;
    /**
     * Emits the given callback every time the given event fires.
     *
     * @param {string} eventName
     * @param {(...any) => any} callback
     * @param {boolean} isOnce
     * @return {EventSubscriber}
     */
    on(eventName: string, callback: (...args: any[]) => any, isOnce?: boolean): EventSubscriber;
    /**
     * Unsubscribes the given event subscriber.
     *
     * @param {EventSubscriber} subscriber
     */
    off(subscriber: EventSubscriber): void;
    /**
     * Emits the event with the given name.
     *
     * @param {string} eventName
     * @param args
     */
    emit(eventName: string, ...args: any[]): void;
    /**
     * Resolves the returned promise as soon as the given event is fired, or immediately if the event was already fired.
     *
     * @param eventName
     * @return {Promise<void>}
     */
    when(eventName: string): Promise<void>;
}

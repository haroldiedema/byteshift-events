/* bouw7 Mercury                                                                        __  __
 *    Business Automation Platform                                                     |  \/  |___ _ _ __ _  _ _ _ _  _
 *                                                                                     | |\/| / -_) '_/ _| || | '_| || |
 * Copyright 2021, Bouw7 Technologies BV                                               |_|  |_\___|_| \__|\_,_|_|  \_, |
 * All rights reserved.                                                                                            |__/
 */
import {EventSubscriber} from './EventSubscriber';

export class EventEmitter
{
    private _events: Map<string, Set<EventSubscriber>> = new Map();
    private _emitted: Set<string>                      = new Set();

    /**
     * Emits the given callback ONCE as soon as the event fires.
     *
     * @param {string} eventName
     * @param {(...any) => any} callback
     * @return {EventSubscriber}
     */
    public once(eventName: string, callback: (...args: any[]) => any): EventSubscriber
    {
        return this.on(eventName, callback, true);
    }

    /**
     * Emits the given callback every time the given event fires.
     *
     * @param {string} eventName
     * @param {(...any) => any} callback
     * @param {boolean} isOnce
     * @return {EventSubscriber}
     */
    public on(eventName: string, callback: (...args: any[]) => any, isOnce?: boolean): EventSubscriber
    {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set());
        }

        const subscriber = new EventSubscriber(this, eventName, callback, isOnce);
        this._events.get(eventName).add(subscriber);

        return subscriber;
    }

    /**
     * Unsubscribes the given event subscriber.
     *
     * @param {EventSubscriber} subscriber
     */
    public off(subscriber: EventSubscriber): void
    {
        if (!this._events.has(subscriber.name)) {
            return;
        }

        this._events.get(subscriber.name).delete(subscriber);
    }

    /**
     * Emits the event with the given name.
     *
     * @param {string} eventName
     * @param args
     */
    public emit(eventName: string, ...args: any[]): void
    {
        if (eventName === '*') {
            throw new Error('Event "*" cannot be emitted.');
        }

        if (this._events.has('*')) {
            this._events.get('*').forEach((sub) => sub.emit(eventName, ...args));
        }

        if (!this._events.has(eventName)) {
            this._emitted.add(eventName);
            return;
        }

        this._events.get(eventName).forEach((sub) => sub.emit(...args));
        this._emitted.add(eventName);
    }

    /**
     * Resolves the returned promise as soon as the given event is fired, or immediately if the event was already fired.
     *
     * @param eventName
     * @return {Promise<void>}
     */
    public async when(eventName: string): Promise<void>
    {
        if (this._emitted.has(eventName)) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            this.once(eventName, () => resolve());
        });
    }
}

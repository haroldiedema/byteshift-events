import { EventEmitter } from './EventEmitter';
export declare class EventSubscriber {
    private emitter;
    readonly name: string;
    private callback;
    private isOnce;
    constructor(emitter: EventEmitter, name: string, callback: (...any: any[]) => any, isOnce?: boolean);
    /**
     * Invokes the attached callback with the given arguments.
     */
    emit(...args: any[]): void;
    /**
     * Unsubscribe this event subscriber.
     */
    unsubscribe(): void;
}

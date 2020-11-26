/* Byteshift Elements                                                              _         _             __   _ _____
 *    A self-encapsulating WebComponent framework                                 | |__ _  _| |_ ___  ___ / /  (_) _/ /_
 *                                                                                | '_ \ || |  _/ -_|(_-</ _ \/ / _/ __/
 * (C)2020, Harold Iedema <harold@iedema.me>                                      |_.__/\_, |\__\___/___/_//_/_/_/ \__/
 * See LICENSE for licensing information                                                |__/               E V E N T S
 */
'use strict';

import {EventEmitter} from './EventEmitter';

export class EventSubscriber
{
    constructor(
        private emitter: EventEmitter,
        public readonly name: string,
        private callback: (...any: any[]) => any,
        private isOnce: boolean = false
    ){
    }

    /**
     * Invokes the attached callback with the given arguments.
     */
    public emit(...args: any[]): void
    {
        this.callback(...args);
        if (this.isOnce) {
            this.emitter.off(this);
        }
    }

    /**
     * Unsubscribe this event subscriber.
     */
    public unsubscribe(): void
    {
        this.emitter.off(this);
    }
}

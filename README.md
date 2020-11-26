![](./docs/logo.png)
====================

Byteshift Events is a tiny event dispatch & subscription library. It is designed
to be incorporated inside your own compiled javascript bundle. The library is
entirely self-explanatory. All you need to do is use the `emit` method from the
`EventEmitter` and give it some arbitrary data (or not). Other parts of the code
can subscribe or unsubscribe to- and from emitted events.

See examples below for clarification.
 
```typescript
import {EventEmitter, EventSubscriber} from '@byteshift/events';

// Let a class be an event emitter.
class UserRegistration extends EventEmitter
{
    public register(data: any): void
    {
        this.emit('registered', data);
    }
}
```

```typescript
// Or just instantiate one.
const emitter = new EventEmitter();

emitter.on('hello', () => console.log('Hello!'));

emitter.emit('hello'); // prints "Hello!" to the console.
```


Subscribe to the 'register' event:

```typescript
const userReg = new UserRegistration();


const subscriber: EventSubscriber = userReg.on('registered', (data) => {
    
    // Do something with the data.
    console.log(data);

    // Unsubscribe self, so we won't be called again.
    subscriber.unsubscribe();
});
```

Subscribe once:

```typescript
userReg.once('registered', (data) => {
    // I am invoked once.
});
```

Wait until an event is emitted.

```typescript
const data = await userReg.when('registered');
```

---

The `on` and `once` methods return an `EventSubscription` instance, which you
can use to _unsubscribe_ from the event if you need to. This takes a lot of the
headache away from using regular EventDispatchers in native ECMAScript when you
wish to use anonymous or arrow functions to listen to events for a short while.


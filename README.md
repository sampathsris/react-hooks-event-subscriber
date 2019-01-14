# react-hooks-event-subscriber

Easily subscribe to events in React Hooks.

## Usage

Consider the following code:

```jsx
import React, { useEffect } from 'react'

const handleClick = e => {
    // Some logic to handle the click event.
}

const handleEscapeKey = e => {
    if (e.key === 'Escape') {
        // Some logic to handle the Escape key.
    }
}

const MyComponent = () => {
    useEffect(() => {
        // Let's subscribe to couple of events
        window.addEventListener('click', handleClick)
        window.addEventListener('keydown', handleEscapeKey)

        return () => {
            window.removeEventListener('click', handleClick)
            window.removeEventListener('keydown', handleEscapeKey)
        }
    })

    return (
        <>{/* ... */}</>
    )
}
```

But, when the number of listeners go up, this becomes very hard to maintain. It is also error prone (Did I unsubscribe from `keydown` or `keydwon`? Did I even remember to unsubscribe?).

Instead you can do:

```jsx
import React, { useEffect } from 'react'
import { hookAllWindowListeners } from 'react-hooks-event-subscribe'

// Let handleClick and handleEscapeKey be same as above

const MyComponent = () => {
    useEffect(hookAllWindowListeners({
        click: handleClick,
        keydown: handleEscapeKey,
    }))
    
    return (
        <>{/* ... */}</>
    )
}
```

But really, you don't need to use this library exclusively with react. If you want to
handle subscribing and unsubscribing to events with vanilla JS in a control manner, you
could do something like this:

```js
// Add event handlers on multiple events
const cleanupEventListeners = hookAllWindowListeners({
    click: handleClick,
    keydown: handleEscapeKey,
})

// ... Optionally, much later in the code, you can clean up
cleanupEventListeners()
```

## API

### `hookListener(target, eventName, eventHandler)`

Returns a function that could be passed to the `useEffect` hook and handles subscribing and unsubscribing. E.g.:

```js
hookListener(window, 'click', e => {
    // Do something with the event.
})
```

### `hookWindowListener(eventName, eventHandler)`

A shorthand to subscribe to events emitted by `window`. Above example in `hookListener` can be rewritten as:

```js
// No need to specify `window`
hookWindowListener('click', e => {
    // Do something with the event.
})
```

### `hookAllListeners(target, listenerMap)`

Like `hookListener`, but allows you to subscribe to multiple events by specifying event names and listeners as key-value pairs in an object literal. E.g.:

```js
hookAllListeners(window, {
    mousedown: e => { /* ... */ },
    mouseup: e => { /* ... */ },
})
```

### `hookAllWindowListeners(listenerMap)`

A shorthand to subscribe to multiple events emitted by `window`. Above example in `hookAllListeners` can be rewritten as:

```js
// No need to specify `window`
hookAllWindowListeners({
    mousedown: e => { /* ... */ },
    mouseup: e => { /* ... */ },
})
```

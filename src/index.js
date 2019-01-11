
/**
 * Returns a function that could be passed to the `useEffect` hook and handles
 * subscribing and unsubscribing.
 */
export function hookListener (target, eventName, eventHandler) {

}

/**
 * A shorthand version of `hookListener` to subscribe to events emitted by `window`.
 */
export function hookWindowListener(eventName, eventHandler) {

}

/**
 * Like `hookListener`, but allows you to subscribe to multiple events by specifying
 * event names and listeners as key-value pairs in an object literal.
 */
export function hookAllListeners(target, listenerMap) {

}

/**
 * A shorthand to subscribe to multiple events emitted by `window`.
 */
export function hookAllWindowListeners(listenerMap) {

}

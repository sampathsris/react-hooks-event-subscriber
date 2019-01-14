
const warn = () => console.log(
	`You may be using react-hooks-event-subscriber in a non browser environment. Calls to hookWindowListener and hookAllWindowListeners will not work.`
)

const window = global.window || {
	addEventListener: warn,
	removeEventListener: warn
}

/**
 * Returns a function that could be passed to the `useEffect` hook and handles
 * subscribing and unsubscribing.
 *
 * @param {EventTarget} target - Target to subscribe.
 * @param {string} eventName - Event to subscribe.
 * @param {(EventListener|function)} eventHandler - Event handler.
 * @returns {function} A function that may be used inside react `useEffect`.
 */
export const hookListener = (target, eventName, eventHandler) => () => {
	target.addEventListener(eventName, eventHandler)

	return () => {
		target.removeEventListener(eventName, eventHandler)
	}
}

/**
 * Returns a function that could be passed to the `useEffect` hook and handles
 * subscribing and unsubscribing from global `window` object.
 *
 * @param {string} eventName - Event to subscribe.
 * @param {(EventListener|function)} eventHandler - Event handler.
 * @returns {function} A function that may be used inside react `useEffect`.
 */
export const hookWindowListener = (eventName, eventHandler) => hookListener(window, eventName, eventHandler)

/**
 * Returns a function that could be passed to the `useEffect` hook and handles
 * subscribing and unsubscribing multiple event names and listeners as
 * key-value pairs in an object.
 *
 * @param {EventTarget} target - Target to subscribe.
 * @param {object} listenerMap - Object mapping event names to listeners as key-value pairs.
 * @returns {function} A function that may be used inside react `useEffect`.
 */
export const hookAllListeners = (target, listenerMap) => () => {
	const eventNames = listenerMap ?
		Object.keys(listenerMap).filter(prop => Object.prototype.hasOwnProperty.call(listenerMap, prop)) :
		[]

	// eslint-disable-next-line guard-for-in
	for (const eventName in eventNames) { //
		target.addEventListener(eventName, listenerMap[eventName])
	}

	return () => {
		// eslint-disable-next-line guard-for-in
		for (const eventName in eventNames) {
			target.removeEventListener(eventName, listenerMap[eventName])
		}
	}
}

/**
 * Returns a function that could be passed to the `useEffect` hook and handles
 * subscribing and unsubscribing to global `window` object. Multiple event names
 *  and listeners can be specified as key-value pairs in an object.
 *
 * @param {object} listenerMap - Object mapping event names to listeners as key-value pairs.
 * @returns {function} A function that may be used inside react `useEffect`.
 */
export const hookAllWindowListeners = listenerMap => hookAllListeners(window, listenerMap)

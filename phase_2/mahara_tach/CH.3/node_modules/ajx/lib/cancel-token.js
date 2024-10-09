/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const EventTargetShim = require("event-target-shim")

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const REASON = Symbol("reason")
const reasonMap = new WeakSet()

/**
 * Check whether the given cancel token has been canceled already.
 * @param {CancelToken} token The cancel token to check.
 * @returns {boolean} `true` if the token has been canceled.
 * @private
 */
function isCanceled(token) {
    return token.canceled
}

/**
 * When a parent token was canceled then it cancels this token.
 * @this CancelToken
 * @param {Event} event The cancel event to forward.
 * @returns {void}
 * @private
 */
function propagateCancel(event) {
    this.cancel(event.reason)
}

/**
 * Check whether the given object is a cancel reason.
 * @param {any} x The object to check.
 * @returns {boolean} `true` if the object is a cancel reason.
 * @memberof module:ajx
 */
function isCancel(x) {
    return reasonMap.has(x)
}

/**
 * CancelToken handles 'cancel' events.
 * @memberof module:ajx
 */
class CancelToken extends EventTargetShim("cancel") {
    /**
     * Create a cancel token.
     * @returns {CancelToken} The created token.
     */
    static new() {
        return new CancelToken()
    }

    /**
     * Create a cancel token which will be canceled if one of the given tokens
     * was canceled.
     * @param {CancelToken[]} parentTokens The tokens to forward events.
     * @returns {CancelToken} The created race token.
     */
    static race(parentTokens) {
        const ct = new CancelToken()

        // If parent tokens are nothing, just return new token.
        if (parentTokens.length === 0) {
            return ct
        }

        // If one of parent tokens has been canceled already, new token should
        // be canceled as well.
        {
            let t = null
            if ((t = parentTokens.find(isCanceled)) != null) {
                ct.cancel(t.reason)
                return ct
            }
        }

        // Setup propagation.
        const onParentCancel = propagateCancel.bind(ct)
        for (const token of parentTokens) {
            token.addEventListener("cancel", onParentCancel)
        }

        return ct
    }

    /**
     * Initialize this cancel token.
     */
    constructor() {
        super()
        this[REASON] = null
    }

    /**
     * The flag to indicate it has been canceled.
     * @type {boolean}
     */
    get canceled() {
        return Boolean(this[REASON])
    }

    /**
     * The error object which indicates the reason of cancel.
     * @type {Error}
     */
    get reason() {
        console.assert(this.canceled, "This cancel token has not been canceled yet.")
        return this[REASON]
    }

    /**
     * Throw an error if this token has been canceled already.
     * @returns {void}
     */
    throwIfCanceled() {
        const reason = this[REASON]
        if (reason != null) {
            throw reason
        }
    }

    /**
     * Cancel this token.
     * @param {Error} [reason] The error object which indicates the reason of cancel.
     * @returns {void}
     */
    cancel(reason) {
        /*eslint-disable no-param-reassign */
        if (typeof reason === "string") {
            reason = new Error(reason)
        }
        if (reason == null) {
            reason = new Error("unknown")
        }
        console.assert(reason instanceof Error, "The reason of cancel tokens should be an Error object or a string.")
        /*eslint-enable */

        if (this[REASON] == null) {
            reasonMap.add(reason)
            this[REASON] = reason
            this.dispatchEvent({type: "cancel", reason})
        }
    }
}

//------------------------------------------------------------------------------
// Exports
//------------------------------------------------------------------------------

module.exports = {
    CancelToken,
    isCancel,
}

/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const CancelToken = require("./cancel-token").CancelToken

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const METHODS = new Set(["GET", "PUT", "DELETE", "POST", "PATCH"])
const JSON_PATTERN = /^application\/json/

/**
 * Normalize the given request body.
 * At same time, this set 'Content-Type' header to 'refHeaders' object.
 * @param {any} body The body to normalize.
 * @param {object} refHeaders The headers to output 'Content-Type' header.
 * @returns {null|string|FormData} The normalized body.
 * @private
 */
function normalizeRequestBody(body, refHeaders) {
    if (body == null) {
        return null
    }

    if (typeof body === "object") {
        if (body instanceof HTMLFormElement) {
            return new FormData(body)
        }
        if (body instanceof FormData) {
            return body
        }
        refHeaders["Content-Type"] = "application/json;charset=UTF-8"
        return JSON.stringify(body)
    }

    if (refHeaders["Content-Type"] == null) {
        refHeaders["Content-Type"] = "text/plain;charset=UTF-8"
    }
    return String(body)
}

/**
 * Normalize the given response body.
 * @param {XMLHttpRequest} xhr The XHR object to normalize.
 * @returns {any} The normalized response body.
 * @private
 */
function normalizeResponseBody(xhr) {
    const contentType = xhr.getResponseHeader("Content-Type") || "text"

    // Parse it as a JSON string if contentType is JSON.
    if (contentType && JSON_PATTERN.test(contentType)) {
        return JSON.parse(xhr.responseText)
    }
    return xhr.responseText
}

/**
 * Send a HTTP request.
 *
 * @param {function} resolve The function to call when it's succeeded.
 * @param {function} reject The callback to call when it's failed.
 * @param {object} config The config object.
 * @param {string} config.method HTTP method to send.
 * @param {string} config.url The destination URL to send.
 * @param {object} [config.headers] The request headers to send.
 * @param {any} [config.body] The request body to send.
 * @param {number} [config.timeout] The timeout in milliseconds.
 * @param {CancelToken} [config.cancelToken] The cancel token.
 * @param {boolean} sync The flag to send the request synchronously.
 * @returns {void}
 * @private
 */
function requestCore(resolve, reject, config, sync) {
    const method = config.method
    const url = config.url
    const headers = config.headers || {}
    const body = normalizeRequestBody(config.body, headers)
    const timeout = config.timeout || 0
    const cancelToken = config.cancelToken || null

    console.assert(METHODS.has(method))
    console.assert(typeof url === "string")
    console.assert(Number.isFinite(timeout) && timeout >= 0)
    console.assert(typeof headers === "object")
    console.assert(cancelToken == null || cancelToken instanceof CancelToken)

    const xhr = new XMLHttpRequest()

    /**
     * Call 'reject' function as ignoring errors.
     * @param {Error} err The error object.
     * @returns {void}
     */
    function safeReject(err) {
        try {
            reject(err)
        }
        catch (errInRejection) {
            console.error(
                "Happened an error in rejection logic: %s", errInRejection)
        }
    }

    /**
     * Call 'reject' function by cancel.
     * @param {CancelEvent} event The cancel event which has the error object of
     * cause.
     * @returns {void}
     */
    function onCancel(event) {
        xhr.abort()
        safeReject(event.reason)
        dispose()
    }

    /**
     * Dispose listeners from xhr.
     * @returns {void}
     */
    function dispose() {
        if (cancelToken != null) {
            cancelToken.removeEventListener("cancel", onCancel)
        }
        xhr.onerror = null
        xhr.onload = null
        xhr.ontimeout = null
    }

    if (cancelToken != null) {
        cancelToken.addEventListener("cancel", onCancel)
    }

    xhr.onerror = () => {
        safeReject(new Error("network error"))
        dispose()
    }

    xhr.onload = () => {
        const status = xhr.status
        if (status >= 200 && status < 300) {
            try {
                const result = (status === 204) ? null : normalizeResponseBody(xhr)
                resolve(result)
            }
            catch (err) {
                safeReject(err)
            }
        }
        else {
            const err = new Error(`${status} ${xhr.statusText}`)
            err.status = status
            err.response = normalizeResponseBody(xhr)
            safeReject(err)
        }

        dispose()
    }

    if (timeout) {
        xhr.timeout = timeout
        xhr.ontimeout = () => {
            safeReject(new Error("timeout"))
            dispose()
        }
    }

    xhr.open(method, url, !sync)
    for (const key of Object.keys(headers)) {
        xhr.setRequestHeader(key, headers[key])
    }
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xhr.send(body)
}

/**
 * Send a HTTP request asynchronously.
 *
 * @param {object} config The config object.
 * @param {string} config.method HTTP method to send.
 * @param {string} config.url The destination URL to send.
 * @param {object} [config.headers] The request headers to send.
 * @param {any} [config.body] The request body to send.
 * @param {number} [config.timeout] The timeout in milliseconds.
 * @param {boolean} [config.sync] The flag to do synchronously.
 * @param {CancelToken} [config.cancelToken] The cancel token.
 * @returns {Promise<any>} The promise object which will get fulfilled after done.
 * @private
 */
function request(config) {
    return new Promise((resolve, reject) =>
        requestCore(resolve, reject, config, false)
    )
}

/**
 * Send a HTTP request synchronously.
 *
 * @param {object} config The config object.
 * @param {string} config.method HTTP method to send.
 * @param {string} config.url The destination URL to send.
 * @param {object} [config.headers] The request headers to send.
 * @param {any} [config.body] The request body to send.
 * @param {number} [config.timeout] The timeout in milliseconds.
 * @param {boolean} [config.sync] The flag to do synchronously.
 * @param {CancelToken} [config.cancelToken] The cancel token.
 * @returns {any} The response body of the request.
 * @private
 */
function requestSync(config) {
    let result = null

    requestCore(
        (value) => {
            result = value
        },
        (error) => {
            throw error
        },
        config,
        true
    )

    return result
}

//------------------------------------------------------------------------------
// Exports
//------------------------------------------------------------------------------

module.exports = {
    request,
    requestSync,
}

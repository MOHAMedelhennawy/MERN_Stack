/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const CT = require("./cancel-token")
const R = require("./request")
const CancelToken = CT.CancelToken
const isCancel = CT.isCancel
const request = R.request

//------------------------------------------------------------------------------
// Exports
//------------------------------------------------------------------------------

/**
 * @memberof module:ajx
 * @typedef {object} AsyncOptions
 * @property {object} [headers] The headers of the request.
 * The keys are header names. The values are each header value.
 * @property {number} [timeout] The timeout in milliseconds.
 * @property {module:ajx.CancelToken} [cancelToken] The cancel token to abort
 * the request.
 */

/**
 * @module ajx
 */
module.exports = {
    CancelToken,
    isCancel,

    /**
     * Send a HTTP GET request asynchronously.
     * @param {string} url The URL to make HTTP GET request.
     * @param {module:ajx.AsyncOptions} options The options to make HTTP GET request.
     * @returns {Promise<any>} The promise object which will get fulfilled when
     * the request completed.
     */
    get(url, options) {
        return request({
            method: "GET",
            url,
            headers: options && options.headers,
            body: null,
            timeout: options && options.timeout,
            cancelToken: options && options.cancelToken,
        })
    },

    /**
     * Send a HTTP PUT request asynchronously.
     * @param {string} url The URL to make HTTP PUT request.
     * @param {any} body The request body to make HTTP PUT request.
     * If this is null or undefined, the request body becomes empty.
     * If this is a FormData or a HTMLFormElement, the request body becomes
     * 'multipart/form-data'.
     * If this is an object, the request body becomes 'application/json'.
     * Otherwise, the request body becomes plain text.
     * @param {module:ajx.AsyncOptions} options The options to make HTTP PUT request.
     * @returns {Promise<any>} The promise object which will get fulfilled when
     * the request completed.
     */
    put(url, body, options) {
        return request({
            method: "PUT",
            url,
            headers: options && options.headers,
            body,
            timeout: options && options.timeout,
            cancelToken: options && options.cancelToken,
        })
    },

    /**
     * Send a HTTP PATCH request asynchronously.
     * @param {string} url The URL to make HTTP PATCH request.
     * @param {any} body The request body to make HTTP PATCH request.
     * If this is null or undefined, the request body becomes empty.
     * If this is a FormData or a HTMLFormElement, the request body becomes
     * 'multipart/form-data'.
     * If this is an object, the request body becomes 'application/json'.
     * Otherwise, the request body becomes plain text.
     * @param {module:ajx.AsyncOptions} options The options to make HTTP PATCH
     * request.
     * @returns {Promise<any>} The promise object which will get fulfilled when
     * the request completed.
     */
    patch(url, body, options) {
        return request({
            method: "PATCH",
            url,
            headers: options && options.headers,
            body,
            timeout: options && options.timeout,
            cancelToken: options && options.cancelToken,
        })
    },

    /**
     * Send a HTTP POST request asynchronously.
     * @param {string} url The URL to make HTTP POST request.
     * @param {any} body The request body to make HTTP POST request.
     * If this is null or undefined, the request body becomes empty.
     * If this is a FormData or a HTMLFormElement, the request body becomes
     * 'multipart/form-data'.
     * If this is an object, the request body becomes 'application/json'.
     * Otherwise, the request body becomes plain text.
     * @param {module:ajx.AsyncOptions} options The options to make HTTP POST request.
     * @returns {Promise<any>} The promise object which will get fulfilled when
     * the request completed.
     */
    post(url, body, options) {
        return request({
            method: "POST",
            url,
            headers: options && options.headers,
            body,
            timeout: options && options.timeout,
            cancelToken: options && options.cancelToken,
        })
    },

    /**
     * Send a HTTP DELETE request asynchronously.
     * @param {string} url The URL to make HTTP DELETE request.
     * @param {module:ajx.AsyncOptions} options The options to make HTTP DELETE
     * request.
     * @returns {Promise<any>} The promise object which will get fulfilled when
     * the request completed.
     */
    delete(url, options) {
        return request({
            method: "DELETE",
            url,
            headers: options && options.headers,
            body: null,
            timeout: options && options.timeout,
            cancelToken: options && options.cancelToken,
        })
    },
}

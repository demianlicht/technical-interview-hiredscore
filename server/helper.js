const request = require('request')

module.exports = {
    /** 
     * We will return a promise that will be resolved with the response from the API
     * to keep with the philosophy of keeping the API calls in a separate file for reusability and modularity
     * as well as the asynchronious nature of node.js
     */

    make_API_call: function (url) {
        return new Promise((resolve, reject) => {
            request(url, { json: true }, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            });
        })
    }
}
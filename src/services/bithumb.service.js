const axios = require('axios');
const hmacSHA512 = require("crypto-js/hmac-sha512");
const config = require('../config/config');

const bithumbApiServerAddr = config.bithumbApi;

const bithumbApiServer = {};

const http = require('http')

const httpAgent = new http.Agent({ keepAlive : true, keepAliveMsecs: 180000 })

bithumbApiServer.post = function (basePath, bodyObj, config, apiKey, apiSecretKey) {
    const apiNonce = `${new Date().getTime()}`
    const params = `&order_currency=${bodyObj.order_currency}&payment_currency=${bodyObj.payment_currency}&units=${bodyObj.units}&price=${bodyObj.price}&type=${bodyObj.type}`
    console.log(makeApiSign(basePath, params, apiNonce, apiSecretKey))
    const instance = axios.create({
        headers: {
            'api-client-type': '2',
            'Api-Key': apiKey,
            'Api-Nonce': apiNonce,
            'Api-Sign': makeApiSign(basePath, params, apiNonce, apiSecretKey),
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded'
        },
        httpAgent,
    })

    return instance.post(bithumbApiServerAddr + basePath, bodyObj, config);
};

const makeApiSign = (basePath, params, apiNonce, apiSecretKey) => {
    const encodedPath = encodeURIComponent(basePath)
    console.log(`${basePath};endpoint=${encodedPath}${params};${apiNonce}`)
    return base64_encode(
        hmacSHA512(
            `${basePath};endpoint=${encodedPath}${params};${apiNonce}`,
            apiSecretKey
        ).toString())
}

const base64_encode = (data) => {
    // discuss at: http://phpjs.org/functions/base64_encode/
    // original by: Tyler Akins (http://rumkin.com)
    // improved by: Bayron Guevara
    // improved by: Thunder.m
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Rafał Kukawski (http://kukawski.pl)
    // bugfixed by: Pellentesque Malesuada
    // example 1: base64_encode('Kevin van Zonneveld');
    // returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
    // example 2: base64_encode('a');
    // returns 2: 'YQ=='
  
    const b64 =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let o1,
      o2,
      o3,
      h1,
      h2,
      h3,
      h4,
      bits,
      i = 0,
      ac = 0,
      enc = "",
      tmp_arr = [];
  
    if (!data) {
      return data;
    }
  
    do {
      // pack three octets into four hexets
      o1 = data.charCodeAt(i++);
      o2 = data.charCodeAt(i++);
      o3 = data.charCodeAt(i++);
  
      bits = (o1 << 16) | (o2 << 8) | o3;
  
      h1 = (bits >> 18) & 0x3f;
      h2 = (bits >> 12) & 0x3f;
      h3 = (bits >> 6) & 0x3f;
      h4 = bits & 0x3f;
  
      // use hexets to index into b64, and append result to encoded string
      tmp_arr[ac++] =
        b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);
  
    enc = tmp_arr.join("");
  
    const r = data.length % 3;
  
    return (r ? enc.slice(0, r - 3) : enc) + "===".slice(r || 3);
  };
  
  const chr = (codePt) => {
    //  discuss at: http://phpjs.org/functions/chr/
    // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // improved by: Brett Zamir (http://brett-zamir.me)
    //   example 1: chr(75) === 'K';
    //   example 1: chr(65536) === '\uD800\uDC00';
    //   returns 1: true
    //   returns 1: true
  
    if (codePt > 0xffff) {
      // Create a four-byte string (length 2) since this code point is high
      //   enough for the UTF-16 encoding (JavaScript internal use), to
      //   require representation with two surrogates (reserved non-characters
      //   used for building other characters; the first is "high" and the next "low")
      codePt -= 0x10000;
      return String.fromCharCode(
        0xd800 + (codePt >> 10),
        0xdc00 + (codePt & 0x3ff)
      );
    }
    return String.fromCharCode(codePt);
  };

  module.exports = bithumbApiServer
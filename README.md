<!--
 Copyright (c) 2024 System233
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# Axios-Cookie 

A Cookie support library for Axios, automatically manages cookies on request, just like `request.Session`.


## Documentation

See the [Documentation](/docs/modules.md) for details.

## Example

```ts

import { setupCookieJar } from 'axios-cookie'
import axios from 'axios'

// Create a Axios instance
const instance = axios.create()
// Setup CookieJar, All cookies will be stored here.
const jar = setupCookieJar(instance,<adapter?>)

// Access value in CookieJar through Key.
jar.setValue(<url>,'key','value')
jar.getValue(<url>,'key')

// Remove a key
jar.setValue(<url>,null)

// Send a Request that will include the `Cookie` header configured in CookieJar.
instance.get(<url>);

// Get the Cookie Header value for site <url>.
jar.getCookie(<url>)
// Put Set-Cookie Header into the CookieJar.
jar.setCookie(<url>,<set-cookie>)

// Import from/Export to JSON Object.
jar.toJSON()
jar.fromJSON(obj)

// Get the internal CookieJar Storage, `cookiejar` or `tough-cookie`.
jar.toRaw()
```

## Adapters

There are currently two CookieJar stores supported by default:
1. [SimpleCookieJarAdapter](/docs/classes/adapters_cookiejar.SimpleCookieJarAdapter.md), powered by [cookiejar](https://github.com/bmeck/node-cookiejar). [default,built-in]. 
Very fast and tiny, x5~x6 faster than tough-cookie.
The original version has too few functions and has been modified to adapt to the new functions.
Built-in features, no additional installation required.
2. [ToughCookieJarAdapter](/docs/classes/adapters_tough.ToughCookieJarAdapter.md), powered by [tough-cookie](https://github.com/salesforce/tough-cookie). 
Slow and large, but powerful!
Need to install `tough-cookie` manually.

## Test

```shell
npm run test
# or
yarn run test
# or
node --test
```


## LICENSE

[MIT](/LICENSE) License
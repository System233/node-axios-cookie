/**
 * Copyright (c) 2024 System233
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */


import { describe, it } from 'node:test'
import assert from 'node:assert'
import MockAdapter from 'axios-mock-adapter'
import { createAxiosMock } from './util.js'
// import { CookieJar } from 'cookiejar'

const TEST_DOMAIN1 = 'example.com'
const TEST_DOMAIN2 = 'example2.com'
const TEST_URL = 'https://example.com/';
const TEST_URL2 = 'https://example2.com/';
const TEST_URL_UNSECURE = 'http://example.com/';
const TEST_URL_PATH = 'https://example.com/path';

/** @typedef { import('../dist/esm/adapter.js').ICookieJarAdapter } ICookieJarAdapter } */

/** @type { (jar: ICookieJarAdapter)=>Promise<void> } */
const setupCookieJar = async(jar) => {
    await jar.setCookie(TEST_URL, [
        `key=${TEST_DOMAIN1}; Path=/; HttpOnly`,
        `seckey=${TEST_DOMAIN1}; Path=/; Secure;`,
        `pathkey=${TEST_DOMAIN1}/; Path=/; HttpOnly`,
        `pathkey=${TEST_DOMAIN1}/path/; Path=/path/;`,
    ]);

    await jar.setCookie(TEST_URL2, [
        `key=${TEST_DOMAIN2}; Path=/; HttpOnly`,
        `seckey=${TEST_DOMAIN2}; Path=/; Secure;`,
        `pathkey=${TEST_DOMAIN2}/; Path=/; HttpOnly`,
        `pathkey=${TEST_DOMAIN2}/path/; Path=/path/;`,
    ]);
}
/** @type { (mock:MockAdapter,jar:ICookieJarAdapter,domain:string,secure:boolean,path:boolean)=>Promise<string> } */
const setupMockCheck = async(mock, jar, domain, secure, path) => {
    const subpath = path ? '/path/' : '/';
    const url = `http${secure ? 's' : ''}://${domain}${subpath}`;
    const cookie = await jar.getCookie(url)
    mock.onAny(url, null, { asymmetricMatch: x => x['Cookie'] == cookie })
        .reply(200, null, { 'Set-Cookie': `skey=${url}; Path=${subpath}${secure ? '; Secure' : ''}` })
    return url;
}
/** @type { (mock:MockAdapter,jar:ICookieJarAdapter,)=>Promise<string[]> } */
const setupAllMockCheck = async(mock, jar) => {
    let urls = []
    urls.push(await setupMockCheck(mock, jar, TEST_DOMAIN1, false, false));
    urls.push(await setupMockCheck(mock, jar, TEST_DOMAIN1, true, false));
    urls.push(await setupMockCheck(mock, jar, TEST_DOMAIN1, false, true));
    urls.push(await setupMockCheck(mock, jar, TEST_DOMAIN1, true, true));

    urls.push(await setupMockCheck(mock, jar, TEST_DOMAIN2, false, false));
    urls.push(await setupMockCheck(mock, jar, TEST_DOMAIN2, true, false));
    urls.push(await setupMockCheck(mock, jar, TEST_DOMAIN2, false, true));
    urls.push(await setupMockCheck(mock, jar, TEST_DOMAIN2, true, true));
    return urls;
}

describe('Cookie', () => {
    it('Bring cookies when requesting', async done => {
        const { axios, mock, jar } = await createAxiosMock()
        setupCookieJar(jar)
        const urls = await setupAllMockCheck(mock, jar);
        await assert.doesNotReject(Promise.all(urls.map(x => axios.get(x))))
    });

    it('Set cookies after responsed', async done => {
        const { axios, mock, jar } = await createAxiosMock()
        const urls = await setupAllMockCheck(mock, jar);
        for (let url of urls) {
            const { axios, mock, jar } = await createAxiosMock()
            setupCookieJar(jar)
            await setupAllMockCheck(mock, jar);
            const resp = await axios.get(url);
            assert.equal(resp.status, 200)
            const u = new URL(url);
            const cookie = await jar.getValue(url,'skey')
            assert.notEqual(cookie, null)
            assert.equal(cookie, url)
        }
    });
    it('Update', async () => {
        const { axios, mock, jar } = await createAxiosMock()
        const url = TEST_URL;
        mock.onAny(url, null).reply(200, null, { 'Set-Cookie': `skey=1; Path=/` })
        await assert.doesNotReject(axios.get(url))
        mock.reset()
        mock.onAny(url, null, { asymmetricMatch: x => x['Cookie'] == 'skey=1' }).reply(200, null, { 'Set-Cookie': `skey=2; Path=/` })
        await assert.doesNotReject(axios.get(url))
        await assert.rejects(axios.get(url))
        mock.reset()
        await assert.rejects(axios.get(url))
        mock.onAny(url, null, { asymmetricMatch: x => x['Cookie'] == 'skey=2' }).reply(200, null, { 'Set-Cookie': `skey=3; Path=/` })
        await assert.doesNotReject(axios.get(url))
        await assert.rejects(axios.get(url));

        mock.reset()
        mock.onAny(url, null, { asymmetricMatch: x => x['Cookie'] == 'skey=3' }).reply(200, null, { 'Set-Cookie': `skey=3; Path=/; Expires=` + new Date(Date.now() - 10000).toUTCString(), })
        await assert.doesNotReject(axios.get(url))
        await assert.rejects(axios.get(url));

        mock.reset()
        mock.onAny(url, null, { asymmetricMatch: x => x['Cookie'] == 'skey=3' }).reply(200, null, { 'Set-Cookie': `skey=3; Path=/; Expires=` + new Date(Date.now() + 10000).toUTCString(), })
        await assert.rejects(axios.get(url));
    })
    it('Secure', async () => {
        const { axios, mock, jar } = await createAxiosMock()
        mock.onAny(TEST_URL, null).reply(200, null, { 'Set-Cookie': `skey=1; Path=/; Secure` })
        mock.onAny(TEST_URL_UNSECURE, null, { asymmetricMatch: x => x['Cookie'] == 'skey=1' }).reply(200, null)
        await assert.doesNotReject(axios.get(TEST_URL))
        await assert.rejects(axios.get(TEST_URL_UNSECURE))
    })

    it('Insecure', async () => {
        const { axios, mock, jar } = await createAxiosMock()

        mock.onAny(TEST_URL, null).reply(200, null, { 'Set-Cookie': `skey=1; Path=/; ` })
        mock.onAny(TEST_URL_UNSECURE, null, { asymmetricMatch: x => x['Cookie'] == 'skey=1' }).reply(200, null)
        await assert.doesNotReject(axios.get(TEST_URL))
        await assert.doesNotReject(axios.get(TEST_URL_UNSECURE))
    })

    // it('HttpOnly', async () => {
    //     const { axios, mock, jar } = createAxiosMock()

    //     mock.onAny(TEST_URL, null).reply(200, null, { 'Set-Cookie': `skey=1; Path=/; HttpOnly` })
    //     await assert.doesNotReject(axios.get(TEST_URL))
    //     mock.reset()

    //     mock.onAny(TEST_URL, null, { asymmetricMatch: x => x['Cookie'] == 'skey=1' }).reply(200, null)
    //     await assert.doesNotReject(axios.get(TEST_URL))
    //     await assert.rejects(axios.get(TEST_URL, { script: true }))
    // })


    it('Path', async () => {
        const { axios, mock, jar } = await createAxiosMock()

        mock.onAny(TEST_URL, null).reply(200, null, { 'Set-Cookie': `skey=1; Path=/path; HttpOnly` })
        await assert.doesNotReject(axios.get(TEST_URL))
        mock.reset()

        mock.onAny(TEST_URL, null, { asymmetricMatch: x => x['Cookie'] == 'skey=1' }).reply(200, null)
        mock.onAny(TEST_URL_PATH, null, { asymmetricMatch: x => x['Cookie'] == 'skey=1' }).reply(200, null)
        await assert.rejects(axios.get(TEST_URL))
        await assert.doesNotReject(axios.get(TEST_URL_PATH))
    })

    
    it('Set', async () => {
        const { axios, mock, jar } = await createAxiosMock()

        jar.setValue(TEST_URL_PATH,'skey','1')

        mock.onAny(TEST_URL, null, { asymmetricMatch: x => x['Cookie'] == 'skey=1' }).reply(200, null)
        mock.onAny(TEST_URL_PATH, null, { asymmetricMatch: x => x['Cookie'] == 'skey=1' }).reply(200, null)
        await assert.rejects(axios.get(TEST_URL))
        await assert.doesNotReject(axios.get(TEST_URL_PATH))
    })
});
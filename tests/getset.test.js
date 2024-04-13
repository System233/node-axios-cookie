/**
 * Copyright (c) 2024 System233
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */


import { describe, it } from 'node:test'
import assert from 'node:assert'
import { TEST_KEY1, TEST_URL1,TEST_URL1_PATH,TEST_URL2, TEST_VALUE1, TEST_VALUE2, createAxiosMock } from './util.js'



describe('CookieJar', () => {
    it('Get/Set', async () => {
        const { axios, jar, mock } = await createAxiosMock()
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),null)
        await assert.doesNotReject(jar.setValue(TEST_URL1,TEST_KEY1,TEST_VALUE1))
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),TEST_VALUE1)
        await assert.doesNotReject(jar.setValue(TEST_URL1,TEST_KEY1,TEST_VALUE2))
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),TEST_VALUE2)
    })
    
    it('Root path', async () => {
        const { axios, jar, mock } = await createAxiosMock()
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),null)
        await assert.doesNotReject(jar.setValue(TEST_URL1,TEST_KEY1,TEST_VALUE1))

        assert.equal(await jar.getValue(TEST_URL1_PATH,TEST_KEY1),TEST_VALUE1)
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),TEST_VALUE1)

    })

    it('Sub path', async () => {
        const { axios, jar, mock } = await createAxiosMock()
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),null)
        await assert.doesNotReject(jar.setValue(TEST_URL1_PATH,TEST_KEY1,TEST_VALUE1))

        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),null)
        assert.equal(await jar.getValue(TEST_URL1_PATH,TEST_KEY1),TEST_VALUE1)
    })

    it('Delete', async () => {
        const { axios, jar, mock } = await createAxiosMock()
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),null)
        await assert.doesNotReject(jar.setValue(TEST_URL1,TEST_KEY1,TEST_VALUE1))
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),TEST_VALUE1)
        
        await assert.doesNotReject(jar.setValue(TEST_URL1,TEST_KEY1,null))
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),null)
    })

    it('Clear', async (done) => {
        const { axios, jar, mock } = await createAxiosMock()
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),null)
        await assert.doesNotReject(jar.setValue(TEST_URL1,TEST_KEY1,TEST_VALUE1))
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),TEST_VALUE1)
        jar.clear();
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),null)
    })
    
    it('from/toJSON', async (done) => {
        const { axios, jar, mock } = await createAxiosMock()
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),null)
        await assert.doesNotReject(jar.setValue(TEST_URL1,TEST_KEY1,TEST_VALUE1))
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),TEST_VALUE1)

        const data=await jar.toJSON();
        assert.notEqual(data,null);
        jar.clear();
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),null)
        await assert.doesNotReject(jar.fromJSON(data))
        assert.equal(await jar.getValue(TEST_URL1,TEST_KEY1),TEST_VALUE1)
    })

    
})
/**
 * Copyright (c) 2024 System233
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import MockAdapter from 'axios-mock-adapter'
import {ToughCookieJarAdapter} from '../dist/esm/adapters/tough.js'
import { setup } from '../dist/esm/index.js'
import axios from 'axios'

export const createAxiosMock = async () => {
    let adapter=null;
    if(process.env.USE_TOUGH_COOKIE){
        adapter=new ToughCookieJarAdapter()
    }
    const instance = axios.create()
    const jar = setup(instance,adapter)
    const mock = new MockAdapter(instance);
    return { axios: instance, jar, mock }
}

export const TEST_DOMAIN1 = 'example.com'
export const TEST_DOMAIN2 = 'example2.com'
export const TEST_KEY1 = 'key1'
export const TEST_KEY2 = 'key2'
export const TEST_VALUE1 = 'key1value'
export const TEST_VALUE2 = 'key2value'
export const TEST_URL1 = `https://${TEST_DOMAIN1}/`
export const TEST_URL1_PATH = `https://${TEST_DOMAIN1}/path/`
export const TEST_URL2 = `https://${TEST_DOMAIN2}/`
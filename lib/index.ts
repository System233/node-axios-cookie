/**
 * Copyright (c) 2024 System233
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

// import { CookieJar } from "cookiejar";
// import { CookieJar } from 'tough-cookie'
// import assert from 'node:assert'
import {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosResponseHeaders,
  RawAxiosResponseHeaders,
} from "axios";
import { ICookieJarAdapter } from "./adapter.js";
import { SimpleCookieJarAdapter } from "./adapters/cookiejar.js";
const findHeaderKey = (
  headers:
    | AxiosHeaders
    | AxiosResponseHeaders
    | AxiosRequestHeaders
    | RawAxiosResponseHeaders,
  key: Lowercase<string>
) => Object.keys(headers).find((x) => x.toLowerCase() == key);

/**
 * Bind CookieJar to AxiosInstance.
 * @param {AxiosInstance} instance AxiosInstance.
 * @param jar CookieJar initial value, if not passed in, it will be created automatically (default `SimpleCookieJarAdapter`). Optional.
 * @returns The CookieJar bound to AxiosInstance.
 *
 * @note This function uses Axios interceptors, calling `interceptors.*.clear()` will cause the function to fail.
 */
export const setup = (instance: AxiosInstance, jar?: ICookieJarAdapter) => {
  if (!jar) {
    jar = new SimpleCookieJarAdapter();
  }
  instance.interceptors.request.use(async (config) => {
    const url = new URL(config.url || "", config.baseURL);
    const cookie = await jar!!.getCookie(url.toString());
    if (cookie) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      const key = findHeaderKey(config.headers, "cookie") || "Cookie";
      const current = config.headers[key];
      if (current) {
        config.headers[key] = `${current}; ${cookie}`;
      } else {
        config.headers[key] = cookie;
      }
    }
    return config;
  });
  const handleResponse = async <T extends AxiosResponse | AxiosError>(
    value: T
  ) => {
    const response =
      value instanceof AxiosError ? value.response : (value as AxiosResponse);
    if (response && response.headers) {
      const key = findHeaderKey(response.headers, "set-cookie");
      const cookies = key && response.headers[key];
      if (cookies) {
        const url = new URL(response.config.url || "", response.config.baseURL);
        await jar!!.setCookie(url.toString(), cookies);
      }
    }
    // NOTE: axios-mock: AxiosError not instanceof AxiosError
    if (value instanceof Error) {
      throw value;
    }
    return value;
  };
  instance.interceptors.response.use(handleResponse, handleResponse);
  return jar;
};

/**
 * Alias for setup.
 * @see setup
 */
export const setupCookieJar = setup;

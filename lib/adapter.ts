/**
 * Copyright (c) 2024 System233
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

/**
 * CookieJar Adapter Interface
 */
export interface ICookieJarAdapter {
  /**
   * @param url The URL where the Cookie is located.
   * @returns The Cookie string of the URL.
   */
  getCookie(url: string): Promise<string>;
  /**
   * @param url The URL where the Cookie is located.
   * @param cookie Set-Cookie String or Array.
   */
  setCookie(url: string, cookie: string | string[]): Promise<void>;
  /**
   * Find the Cookie value by key.
   * @param url The URL where the Cookie is located.
   * @param key Key of the Cookie.
   * @returns The value of the key, or `null` if not found.
   */
  getValue(url: string, key: string): Promise<string | null>;
  /**
   * Set the Cookie value by key.
   * @param url The URL where the Cookie is located.
   * @param key Key of the Cookie.
   * @param value Value of the Cookie.
   */
  setValue(url: string, key: string, value: string | null): Promise<void>;
  /**
   * Remove all Cookies.
   */
  clear(): Promise<void>;
  /**
   * Deserialize JSON into CookieJar.
   */
  fromJSON(value: any): Promise<void>;
  /**
   * Serialize CookieJar into JSON.
   */
  toJSON(): Promise<any>;

  /**
   * Get the raw CookieJar object.
   */
  toRaw<T>(): T;
}

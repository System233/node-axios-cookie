/**
 * Copyright (c) 2024 System233
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { Cookie, CookieJar } from "tough-cookie";
import { ICookieJarAdapter } from "../adapter.js";

export class ToughCookieJarAdapter implements ICookieJarAdapter {
  protected jar: CookieJar;
  constructor(jar?: CookieJar) {
    if (!jar) {
      jar = new CookieJar();
    }
    this.jar = jar;
  }
  async clear(): Promise<void> {
    await this.jar.removeAllCookies();
  }
  protected async getCookieByKey(url: string, key: string) {
    const cookies = await this.jar.getCookies(url);
    const cookie = cookies.find((x) => x.key == key);
    return cookie;
  }
  async getValue(url: string, key: string): Promise<string | null> {
    const cookie = await this.getCookieByKey(url, key);
    return cookie ? cookie.value : null;
  }
  async setValue(url: string, key: string, value: string): Promise<void> {
    const cookie = await this.getCookieByKey(url, key);
    if (cookie) {
      cookie.value = value;
      return;
    }
    await this.jar.setCookie(new Cookie({ key, value }), url);
  }

  async fromJSON(value: any): Promise<void> {
    this.jar = await CookieJar.deserialize(value);
  }
  async toJSON(): Promise<any> {
    return await this.jar.serialize();
  }

  async getCookie(url: string): Promise<string> {
    return await this.jar.getCookieString(url);
  }
  async setCookie(url: string, cookie: string | string[]): Promise<void> {
    if (!Array.isArray(cookie)) {
      cookie = [cookie];
    }
    await Promise.all(cookie.map((x) => this.jar.setCookie(x, url)));
  }

  toRaw<T = CookieJar>(): T {
    return this.jar as T;
  }
}

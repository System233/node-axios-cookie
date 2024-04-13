/**
 * Copyright (c) 2024 System233
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

// import { Cookie, CookieJar } from "cookiejar";
import { ICookieJarAdapter } from "../adapter.js";

export class CookieAccessInfo {
  domain: string | null;
  path: string;
  secure: boolean;
  script: boolean;

  constructor(
    domain: string | undefined,
    path: string,
    secure: boolean,
    script: boolean
  ) {
    this.domain = domain || null;
    this.path = path || "/";
    this.secure = !!secure;
    this.script = !!script;
  }

  static All: any = Object.freeze(Object.create(null));
}

export class Cookie {
  name: string = "";
  value: string = "";
  expiration_date: number = Infinity;
  path: string = "/";
  explicit_path: boolean = false;
  domain: string | null = null;
  explicit_domain: boolean = false;
  secure: boolean = false;
  noscript: boolean = false;

  constructor(
    cookiestr: Cookie | string | undefined,
    request_domain?: string,
    request_path?: string
  ) {
    if (cookiestr instanceof Cookie) {
      return cookiestr;
    }
    this.path = request_path || "/";
    this.domain = request_domain || null;
    if (cookiestr) {
      this.parse(cookiestr, request_domain, request_path);
    }
  }

  toString(): string {
    const str = [`${this.name}=${this.value}`];
    if (this.expiration_date !== Infinity) {
      str.push(`expires=${new Date(this.expiration_date).toUTCString()}`);
    }
    if (this.domain) {
      str.push(`domain=${this.domain}`);
    }
    if (this.path) {
      str.push(`path=${this.path}`);
    }
    if (this.secure) {
      str.push("secure");
    }
    if (this.noscript) {
      str.push("httponly");
    }
    return str.join("; ");
  }

  toValueString(): string {
    return `${this.name}=${this.value}`;
  }

  parse(
    str: string,
    request_domain?: string,
    request_path?: string
  ): Cookie | undefined {
    if (str.length > 32768) {
      console.warn("Cookie too long for parsing (>32768 characters)");
      return;
    }

    const parts = str.split(";").filter((value) => !!value);
    let pair: RegExpMatchArray | null;

    pair = parts[0].match(/([^=]+)=([\s\S]*)/);
    if (!pair) {
      console.warn(`Invalid cookie header encountered. Header: '${str}'`);
      return;
    }

    const key = pair[1];
    const value = pair[2];
    if (
      typeof key !== "string" ||
      key.length === 0 ||
      typeof value !== "string"
    ) {
      console.warn(
        `Unable to extract values from cookie header. Cookie: '${str}'`
      );
      return;
    }

    this.name = key;
    this.value = value;

    for (let i = 1; i < parts.length; i += 1) {
      pair = parts[i].match(/([^=]+)(?:=([\s\S]*))?/);
      if (pair == null) {
        continue;
      }
      const key = pair[1].trim().toLowerCase();
      const value = pair[2];
      switch (key) {
        case "httponly":
          this.noscript = true;
          break;
        case "expires":
          this.expiration_date = value ? Number(Date.parse(value)) : Infinity;
          break;
        case "path":
          this.path = value ? value.trim() : "";
          this.explicit_path = true;
          break;
        case "domain":
          this.domain = value ? value.trim() : "";
          this.explicit_domain = !!this.domain;
          break;
        case "secure":
          this.secure = true;
          break;
      }
    }

    if (!this.explicit_path) {
      this.path = request_path || "/";
    }
    if (!this.explicit_domain) {
      this.domain = request_domain || null;
    }

    return this;
  }

  matches(
    access_info: CookieAccessInfo | typeof CookieAccessInfo.All
  ): boolean {
    if (access_info === CookieAccessInfo.All) {
      return true;
    }
    if (
      (this.noscript && access_info.script) ||
      (this.secure && !access_info.secure) ||
      !this.collidesWith(access_info)
    ) {
      return false;
    }
    return true;
  }

  collidesWith(access_info: Omit<CookieAccessInfo, "script">): boolean {
    if (
      (this.path && !access_info.path) ||
      (this.domain && !access_info.domain)
    ) {
      return false;
    }
    if (this.path && access_info.path.indexOf(this.path) !== 0) {
      return false;
    }
    if (this.explicit_path && access_info.path.indexOf(this.path) !== 0) {
      return false;
    }
    const access_domain =
      access_info.domain && access_info.domain.replace(/^[\.]/, "");
    const cookie_domain = this.domain && this.domain.replace(/^[\.]/, "");
    if (cookie_domain === access_domain) {
      return true;
    }
    if (cookie_domain) {
      if (!this.explicit_domain) {
        return false; // we already checked if the domains were exactly the same
      }
      if (access_domain) {
        const wildcard = access_domain.indexOf(cookie_domain);
        if (
          wildcard === -1 ||
          wildcard !== access_domain.length - cookie_domain.length
        ) {
          return false;
        }
      }
      return true;
    }
    return true;
  }
}

interface CookieArray extends Array<Cookie> {
  toValueString(): string;
}
const createCookieArray = () =>
  Object.assign([], {
    toString: function toString(this: CookieArray) {
      return this.join(":");
    },
    toValueString: function toValueString(this: CookieArray) {
      return this.map((c) => c.toValueString()).join("; ");
    },
  }) as CookieArray;
export class CookieJar {
  private cookies: Record<string, Cookie[]>;

  constructor() {
    this.cookies = Object.create(null); // name: [Cookie]
  }
  toJSON() {
    return this.cookies;
  }
  fromJSON(cookies: Record<string, Cookie[]>) {
    return (this.cookies = cookies);
  }
  removeAll() {
    this.cookies = Object.create(null);
  }
  setCookie(
    cookie: Cookie | string,
    request_domain?: string,
    request_path?: string
  ): Cookie | Cookie[] | false {
    cookie = new Cookie(cookie, request_domain, request_path);
    const remove = cookie.expiration_date <= Date.now();
    if (this.cookies[cookie.name] !== undefined) {
      const cookies_list = this.cookies[cookie.name];
      for (let i = 0; i < cookies_list.length; i += 1) {
        const collidable_cookie = cookies_list[i];
        if (collidable_cookie.collidesWith(cookie)) {
          if (remove) {
            cookies_list.splice(i, 1);
            if (cookies_list.length === 0) {
              delete this.cookies[cookie.name];
            }
            return false;
          }
          cookies_list[i] = cookie;
          return cookie;
        }
      }
      if (remove) {
        return false;
      }
      cookies_list.push(cookie);
      return cookie;
    }
    if (remove) {
      return false;
    }
    this.cookies[cookie.name] = [cookie];
    return this.cookies[cookie.name];
  }

  getCookie(
    cookie_name: string,
    access_info: CookieAccessInfo | typeof CookieAccessInfo.All
  ): Cookie | undefined {
    const cookies_list = this.cookies[cookie_name];
    if (!cookies_list) {
      return;
    }
    for (let i = 0; i < cookies_list.length; i += 1) {
      const cookie = cookies_list[i];
      if (cookie.expiration_date <= Date.now()) {
        if (cookies_list.length === 0) {
          delete this.cookies[cookie.name];
        }
        continue;
      }

      if (cookie.matches(access_info)) {
        return cookie;
      }
    }
  }

  getCookies(
    access_info: CookieAccessInfo | typeof CookieAccessInfo.All
  ): CookieArray {
    const matches = createCookieArray();
    for (const cookie_name in this.cookies) {
      const cookie = this.getCookie(cookie_name, access_info);
      if (cookie) {
        matches.push(cookie);
      }
    }
    Object.assign(matches, {
      toString: function toString() {
        return matches.join(":");
      },
      toValueString: function toValueString() {
        return matches.map((c) => c.toValueString()).join("; ");
      },
    });
    return matches;
  }

  setCookies(
    cookies: (Cookie | string)[] | string,
    request_domain?: string,
    request_path?: string
  ): CookieArray {
    cookies = Array.isArray(cookies)
      ? cookies
      : cookies.split(/[:](?=\s*[a-zA-Z0-9_\-]+\s*[=])/g);
    const successful: CookieArray = createCookieArray();
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = new Cookie(cookies[i], request_domain, request_path);
      if (this.setCookie(cookie, request_domain, request_path)) {
        successful.push(cookie);
      }
    }
    return successful;
  }
}

export class SimpleCookieJarAdapter implements ICookieJarAdapter {
  jar = new CookieJar();
  protected getAccessInfo(url: string) {
    const uri = new URL(url);
    return {
      domain: uri.host,
      path: uri.pathname,
      secure: uri.protocol == "https:",
      script: false,
    };
  }
  async getCookie(url: string): Promise<string> {
    return this.jar.getCookies(this.getAccessInfo(url)).toValueString();
  }
  async setCookie(url: string, cookie: string | string[]): Promise<void> {
    const uri = new URL(url);
    this.jar.setCookies(cookie, uri.host, uri.pathname);
  }
  async getValue(url: string, key: string): Promise<string | null> {
    const cookie = this.jar.getCookie(key, this.getAccessInfo(url));
    if (cookie) {
      return cookie.value;
    }
    return null;
  }
  async setValue(
    url: string,
    key: string,
    value: string | null
  ): Promise<void> {
    const info = this.getAccessInfo(url);
    let cookie = this.jar.getCookie(key, info);
    if (cookie) {
      if (value) {
        cookie.value = value;
      } else {
        cookie.expiration_date = -1;
      }
    } else if (value) {
      cookie = new Cookie("", info.domain, info.path);
      cookie.name = key;
      cookie.value = value;
    }
    if (cookie) {
      this.jar.setCookie(cookie, info.domain, info.path);
    }
  }
  async clear(): Promise<void> {
    this.jar.removeAll();
  }
  async fromJSON(value: any): Promise<void> {
    this.jar.fromJSON(value);
  }
  async toJSON(): Promise<any> {
    return this.jar.toJSON();
  }
  toRaw<T = CookieJar>(): T {
    return this.jar as T;
  }
}

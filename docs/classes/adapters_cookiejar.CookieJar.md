[Axios-Cookie](../README.md) / [Exports](../modules.md) / [adapters/cookiejar](../modules/adapters_cookiejar.md) / CookieJar

# Class: CookieJar

[adapters/cookiejar](../modules/adapters_cookiejar.md).CookieJar

## Table of contents

### Constructors

- [constructor](adapters_cookiejar.CookieJar.md#constructor)

### Properties

- [cookies](adapters_cookiejar.CookieJar.md#cookies)

### Methods

- [fromJSON](adapters_cookiejar.CookieJar.md#fromjson)
- [getCookie](adapters_cookiejar.CookieJar.md#getcookie)
- [getCookies](adapters_cookiejar.CookieJar.md#getcookies)
- [removeAll](adapters_cookiejar.CookieJar.md#removeall)
- [setCookie](adapters_cookiejar.CookieJar.md#setcookie)
- [setCookies](adapters_cookiejar.CookieJar.md#setcookies)
- [toJSON](adapters_cookiejar.CookieJar.md#tojson)

## Constructors

### constructor

• **new CookieJar**(): [`CookieJar`](adapters_cookiejar.CookieJar.md)

#### Returns

[`CookieJar`](adapters_cookiejar.CookieJar.md)

#### Defined in

adapters/cookiejar.ts:224

## Properties

### cookies

• `Private` **cookies**: `Record`\<`string`, [`Cookie`](adapters_cookiejar.Cookie.md)[]\>

#### Defined in

adapters/cookiejar.ts:222

## Methods

### fromJSON

▸ **fromJSON**(`cookies`): `Record`\<`string`, [`Cookie`](adapters_cookiejar.Cookie.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cookies` | `Record`\<`string`, [`Cookie`](adapters_cookiejar.Cookie.md)[]\> |

#### Returns

`Record`\<`string`, [`Cookie`](adapters_cookiejar.Cookie.md)[]\>

#### Defined in

adapters/cookiejar.ts:230

___

### getCookie

▸ **getCookie**(`cookie_name`, `access_info`): `undefined` \| [`Cookie`](adapters_cookiejar.Cookie.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cookie_name` | `string` |
| `access_info` | `any` |

#### Returns

`undefined` \| [`Cookie`](adapters_cookiejar.Cookie.md)

#### Defined in

adapters/cookiejar.ts:272

___

### getCookies

▸ **getCookies**(`access_info`): `CookieArray`

#### Parameters

| Name | Type |
| :------ | :------ |
| `access_info` | `any` |

#### Returns

`CookieArray`

#### Defined in

adapters/cookiejar.ts:295

___

### removeAll

▸ **removeAll**(): `void`

#### Returns

`void`

#### Defined in

adapters/cookiejar.ts:233

___

### setCookie

▸ **setCookie**(`cookie`, `request_domain?`, `request_path?`): ``false`` \| [`Cookie`](adapters_cookiejar.Cookie.md) \| [`Cookie`](adapters_cookiejar.Cookie.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `cookie` | `string` \| [`Cookie`](adapters_cookiejar.Cookie.md) |
| `request_domain?` | `string` |
| `request_path?` | `string` |

#### Returns

``false`` \| [`Cookie`](adapters_cookiejar.Cookie.md) \| [`Cookie`](adapters_cookiejar.Cookie.md)[]

#### Defined in

adapters/cookiejar.ts:236

___

### setCookies

▸ **setCookies**(`cookies`, `request_domain?`, `request_path?`): `CookieArray`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cookies` | `string` \| (`string` \| [`Cookie`](adapters_cookiejar.Cookie.md))[] |
| `request_domain?` | `string` |
| `request_path?` | `string` |

#### Returns

`CookieArray`

#### Defined in

adapters/cookiejar.ts:316

___

### toJSON

▸ **toJSON**(): `Record`\<`string`, [`Cookie`](adapters_cookiejar.Cookie.md)[]\>

#### Returns

`Record`\<`string`, [`Cookie`](adapters_cookiejar.Cookie.md)[]\>

#### Defined in

adapters/cookiejar.ts:227

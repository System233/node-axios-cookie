[Axios-Cookie](../README.md) / [Exports](../modules.md) / [adapters/cookiejar](../modules/adapters_cookiejar.md) / SimpleCookieJarAdapter

# Class: SimpleCookieJarAdapter

[adapters/cookiejar](../modules/adapters_cookiejar.md).SimpleCookieJarAdapter

CookieJar Adapter Interface

## Implements

- [`ICookieJarAdapter`](../interfaces/adapter.ICookieJarAdapter.md)

## Table of contents

### Constructors

- [constructor](adapters_cookiejar.SimpleCookieJarAdapter.md#constructor)

### Properties

- [jar](adapters_cookiejar.SimpleCookieJarAdapter.md#jar)

### Methods

- [clear](adapters_cookiejar.SimpleCookieJarAdapter.md#clear)
- [fromJSON](adapters_cookiejar.SimpleCookieJarAdapter.md#fromjson)
- [getAccessInfo](adapters_cookiejar.SimpleCookieJarAdapter.md#getaccessinfo)
- [getCookie](adapters_cookiejar.SimpleCookieJarAdapter.md#getcookie)
- [getValue](adapters_cookiejar.SimpleCookieJarAdapter.md#getvalue)
- [setCookie](adapters_cookiejar.SimpleCookieJarAdapter.md#setcookie)
- [setValue](adapters_cookiejar.SimpleCookieJarAdapter.md#setvalue)
- [toJSON](adapters_cookiejar.SimpleCookieJarAdapter.md#tojson)
- [toRaw](adapters_cookiejar.SimpleCookieJarAdapter.md#toraw)

## Constructors

### constructor

• **new SimpleCookieJarAdapter**(): [`SimpleCookieJarAdapter`](adapters_cookiejar.SimpleCookieJarAdapter.md)

#### Returns

[`SimpleCookieJarAdapter`](adapters_cookiejar.SimpleCookieJarAdapter.md)

## Properties

### jar

• **jar**: [`CookieJar`](adapters_cookiejar.CookieJar.md)

#### Defined in

adapters/cookiejar.ts:336

## Methods

### clear

▸ **clear**(): `Promise`\<`void`\>

Remove all Cookies.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[ICookieJarAdapter](../interfaces/adapter.ICookieJarAdapter.md).[clear](../interfaces/adapter.ICookieJarAdapter.md#clear)

#### Defined in

adapters/cookiejar.ts:382

___

### fromJSON

▸ **fromJSON**(`value`): `Promise`\<`void`\>

Deserialize JSON into CookieJar.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[ICookieJarAdapter](../interfaces/adapter.ICookieJarAdapter.md).[fromJSON](../interfaces/adapter.ICookieJarAdapter.md#fromjson)

#### Defined in

adapters/cookiejar.ts:385

___

### getAccessInfo

▸ **getAccessInfo**(`url`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `domain` | `string` |
| `path` | `string` |
| `script` | `boolean` |
| `secure` | `boolean` |

#### Defined in

adapters/cookiejar.ts:337

___

### getCookie

▸ **getCookie**(`url`): `Promise`\<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL where the Cookie is located. |

#### Returns

`Promise`\<`string`\>

The Cookie string of the URL.

#### Implementation of

[ICookieJarAdapter](../interfaces/adapter.ICookieJarAdapter.md).[getCookie](../interfaces/adapter.ICookieJarAdapter.md#getcookie)

#### Defined in

adapters/cookiejar.ts:346

___

### getValue

▸ **getValue**(`url`, `key`): `Promise`\<``null`` \| `string`\>

Find the Cookie value by key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL where the Cookie is located. |
| `key` | `string` | Key of the Cookie. |

#### Returns

`Promise`\<``null`` \| `string`\>

The value of the key, or `null` if not found.

#### Implementation of

[ICookieJarAdapter](../interfaces/adapter.ICookieJarAdapter.md).[getValue](../interfaces/adapter.ICookieJarAdapter.md#getvalue)

#### Defined in

adapters/cookiejar.ts:353

___

### setCookie

▸ **setCookie**(`url`, `cookie`): `Promise`\<`void`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL where the Cookie is located. |
| `cookie` | `string` \| `string`[] | Set-Cookie String or Array. |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[ICookieJarAdapter](../interfaces/adapter.ICookieJarAdapter.md).[setCookie](../interfaces/adapter.ICookieJarAdapter.md#setcookie)

#### Defined in

adapters/cookiejar.ts:349

___

### setValue

▸ **setValue**(`url`, `key`, `value`): `Promise`\<`void`\>

Set the Cookie value by key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL where the Cookie is located. |
| `key` | `string` | Key of the Cookie. |
| `value` | ``null`` \| `string` | Value of the Cookie. |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[ICookieJarAdapter](../interfaces/adapter.ICookieJarAdapter.md).[setValue](../interfaces/adapter.ICookieJarAdapter.md#setvalue)

#### Defined in

adapters/cookiejar.ts:360

___

### toJSON

▸ **toJSON**(): `Promise`\<`any`\>

Serialize CookieJar into JSON.

#### Returns

`Promise`\<`any`\>

#### Implementation of

[ICookieJarAdapter](../interfaces/adapter.ICookieJarAdapter.md).[toJSON](../interfaces/adapter.ICookieJarAdapter.md#tojson)

#### Defined in

adapters/cookiejar.ts:388

___

### toRaw

▸ **toRaw**\<`T`\>(): `T`

Get the raw CookieJar object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`CookieJar`](adapters_cookiejar.CookieJar.md) |

#### Returns

`T`

#### Implementation of

[ICookieJarAdapter](../interfaces/adapter.ICookieJarAdapter.md).[toRaw](../interfaces/adapter.ICookieJarAdapter.md#toraw)

#### Defined in

adapters/cookiejar.ts:391

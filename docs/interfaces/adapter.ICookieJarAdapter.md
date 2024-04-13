[Axios-Cookie](../README.md) / [Exports](../modules.md) / [adapter](../modules/adapter.md) / ICookieJarAdapter

# Interface: ICookieJarAdapter

[adapter](../modules/adapter.md).ICookieJarAdapter

CookieJar Adapter Interface

## Implemented by

- [`SimpleCookieJarAdapter`](../classes/adapters_cookiejar.SimpleCookieJarAdapter.md)
- [`ToughCookieJarAdapter`](../classes/adapters_tough.ToughCookieJarAdapter.md)

## Table of contents

### Methods

- [clear](adapter.ICookieJarAdapter.md#clear)
- [fromJSON](adapter.ICookieJarAdapter.md#fromjson)
- [getCookie](adapter.ICookieJarAdapter.md#getcookie)
- [getValue](adapter.ICookieJarAdapter.md#getvalue)
- [setCookie](adapter.ICookieJarAdapter.md#setcookie)
- [setValue](adapter.ICookieJarAdapter.md#setvalue)
- [toJSON](adapter.ICookieJarAdapter.md#tojson)
- [toRaw](adapter.ICookieJarAdapter.md#toraw)

## Methods

### clear

▸ **clear**(): `Promise`\<`void`\>

Remove all Cookies.

#### Returns

`Promise`\<`void`\>

#### Defined in

adapter.ts:39

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

#### Defined in

adapter.ts:43

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

#### Defined in

adapter.ts:16

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

#### Defined in

adapter.ts:28

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

#### Defined in

adapter.ts:21

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

#### Defined in

adapter.ts:35

___

### toJSON

▸ **toJSON**(): `Promise`\<`any`\>

Serialize CookieJar into JSON.

#### Returns

`Promise`\<`any`\>

#### Defined in

adapter.ts:47

___

### toRaw

▸ **toRaw**\<`T`\>(): `T`

Get the raw CookieJar object.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`T`

#### Defined in

adapter.ts:52

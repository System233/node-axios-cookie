[Axios-Cookie](../README.md) / [Exports](../modules.md) / [adapters/tough](../modules/adapters_tough.md) / ToughCookieJarAdapter

# Class: ToughCookieJarAdapter

[adapters/tough](../modules/adapters_tough.md).ToughCookieJarAdapter

CookieJar Adapter Interface

## Implements

- [`ICookieJarAdapter`](../interfaces/adapter.ICookieJarAdapter.md)

## Table of contents

### Constructors

- [constructor](adapters_tough.ToughCookieJarAdapter.md#constructor)

### Properties

- [jar](adapters_tough.ToughCookieJarAdapter.md#jar)

### Methods

- [clear](adapters_tough.ToughCookieJarAdapter.md#clear)
- [fromJSON](adapters_tough.ToughCookieJarAdapter.md#fromjson)
- [getCookie](adapters_tough.ToughCookieJarAdapter.md#getcookie)
- [getCookieByKey](adapters_tough.ToughCookieJarAdapter.md#getcookiebykey)
- [getValue](adapters_tough.ToughCookieJarAdapter.md#getvalue)
- [setCookie](adapters_tough.ToughCookieJarAdapter.md#setcookie)
- [setValue](adapters_tough.ToughCookieJarAdapter.md#setvalue)
- [toJSON](adapters_tough.ToughCookieJarAdapter.md#tojson)
- [toRaw](adapters_tough.ToughCookieJarAdapter.md#toraw)

## Constructors

### constructor

• **new ToughCookieJarAdapter**(`jar?`): [`ToughCookieJarAdapter`](adapters_tough.ToughCookieJarAdapter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jar?` | `CookieJar` |

#### Returns

[`ToughCookieJarAdapter`](adapters_tough.ToughCookieJarAdapter.md)

#### Defined in

adapters/tough.ts:13

## Properties

### jar

• `Protected` **jar**: `CookieJar`

#### Defined in

adapters/tough.ts:12

## Methods

### clear

▸ **clear**(): `Promise`\<`void`\>

Remove all Cookies.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[ICookieJarAdapter](../interfaces/adapter.ICookieJarAdapter.md).[clear](../interfaces/adapter.ICookieJarAdapter.md#clear)

#### Defined in

adapters/tough.ts:19

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

adapters/tough.ts:40

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

adapters/tough.ts:47

___

### getCookieByKey

▸ **getCookieByKey**(`url`, `key`): `Promise`\<`undefined` \| `Cookie`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `key` | `string` |

#### Returns

`Promise`\<`undefined` \| `Cookie`\>

#### Defined in

adapters/tough.ts:22

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

adapters/tough.ts:27

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

adapters/tough.ts:50

___

### setValue

▸ **setValue**(`url`, `key`, `value`): `Promise`\<`void`\>

Set the Cookie value by key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL where the Cookie is located. |
| `key` | `string` | Key of the Cookie. |
| `value` | `string` | Value of the Cookie. |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[ICookieJarAdapter](../interfaces/adapter.ICookieJarAdapter.md).[setValue](../interfaces/adapter.ICookieJarAdapter.md#setvalue)

#### Defined in

adapters/tough.ts:31

___

### toJSON

▸ **toJSON**(): `Promise`\<`any`\>

Serialize CookieJar into JSON.

#### Returns

`Promise`\<`any`\>

#### Implementation of

[ICookieJarAdapter](../interfaces/adapter.ICookieJarAdapter.md).[toJSON](../interfaces/adapter.ICookieJarAdapter.md#tojson)

#### Defined in

adapters/tough.ts:43

___

### toRaw

▸ **toRaw**\<`T`\>(): `T`

Get the raw CookieJar object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `CookieJar` |

#### Returns

`T`

#### Implementation of

[ICookieJarAdapter](../interfaces/adapter.ICookieJarAdapter.md).[toRaw](../interfaces/adapter.ICookieJarAdapter.md#toraw)

#### Defined in

adapters/tough.ts:57

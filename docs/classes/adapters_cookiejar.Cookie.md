[Axios-Cookie](../README.md) / [Exports](../modules.md) / [adapters/cookiejar](../modules/adapters_cookiejar.md) / Cookie

# Class: Cookie

[adapters/cookiejar](../modules/adapters_cookiejar.md).Cookie

## Table of contents

### Constructors

- [constructor](adapters_cookiejar.Cookie.md#constructor)

### Properties

- [domain](adapters_cookiejar.Cookie.md#domain)
- [expiration\_date](adapters_cookiejar.Cookie.md#expiration_date)
- [explicit\_domain](adapters_cookiejar.Cookie.md#explicit_domain)
- [explicit\_path](adapters_cookiejar.Cookie.md#explicit_path)
- [name](adapters_cookiejar.Cookie.md#name)
- [noscript](adapters_cookiejar.Cookie.md#noscript)
- [path](adapters_cookiejar.Cookie.md#path)
- [secure](adapters_cookiejar.Cookie.md#secure)
- [value](adapters_cookiejar.Cookie.md#value)

### Methods

- [collidesWith](adapters_cookiejar.Cookie.md#collideswith)
- [matches](adapters_cookiejar.Cookie.md#matches)
- [parse](adapters_cookiejar.Cookie.md#parse)
- [toString](adapters_cookiejar.Cookie.md#tostring)
- [toValueString](adapters_cookiejar.Cookie.md#tovaluestring)

## Constructors

### constructor

• **new Cookie**(`cookiestr`, `request_domain?`, `request_path?`): [`Cookie`](adapters_cookiejar.Cookie.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cookiestr` | `undefined` \| `string` \| [`Cookie`](adapters_cookiejar.Cookie.md) |
| `request_domain?` | `string` |
| `request_path?` | `string` |

#### Returns

[`Cookie`](adapters_cookiejar.Cookie.md)

#### Defined in

adapters/cookiejar.ts:43

## Properties

### domain

• **domain**: ``null`` \| `string` = `null`

#### Defined in

adapters/cookiejar.ts:38

___

### expiration\_date

• **expiration\_date**: `number` = `Infinity`

#### Defined in

adapters/cookiejar.ts:35

___

### explicit\_domain

• **explicit\_domain**: `boolean` = `false`

#### Defined in

adapters/cookiejar.ts:39

___

### explicit\_path

• **explicit\_path**: `boolean` = `false`

#### Defined in

adapters/cookiejar.ts:37

___

### name

• **name**: `string` = `""`

#### Defined in

adapters/cookiejar.ts:33

___

### noscript

• **noscript**: `boolean` = `false`

#### Defined in

adapters/cookiejar.ts:41

___

### path

• **path**: `string` = `"/"`

#### Defined in

adapters/cookiejar.ts:36

___

### secure

• **secure**: `boolean` = `false`

#### Defined in

adapters/cookiejar.ts:40

___

### value

• **value**: `string` = `""`

#### Defined in

adapters/cookiejar.ts:34

## Methods

### collidesWith

▸ **collidesWith**(`access_info`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `access_info` | `Omit`\<[`CookieAccessInfo`](adapters_cookiejar.CookieAccessInfo.md), ``"script"``\> |

#### Returns

`boolean`

#### Defined in

adapters/cookiejar.ts:171

___

### matches

▸ **matches**(`access_info`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `access_info` | `any` |

#### Returns

`boolean`

#### Defined in

adapters/cookiejar.ts:155

___

### parse

▸ **parse**(`str`, `request_domain?`, `request_path?`): `undefined` \| [`Cookie`](adapters_cookiejar.Cookie.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `request_domain?` | `string` |
| `request_path?` | `string` |

#### Returns

`undefined` \| [`Cookie`](adapters_cookiejar.Cookie.md)

#### Defined in

adapters/cookiejar.ts:82

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

adapters/cookiejar.ts:58

___

### toValueString

▸ **toValueString**(): `string`

#### Returns

`string`

#### Defined in

adapters/cookiejar.ts:78

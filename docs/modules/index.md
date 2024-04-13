[Axios-Cookie](../README.md) / [Exports](../modules.md) / index

# Module: index

## Table of contents

### Functions

- [setup](index.md#setup)
- [setupCookieJar](index.md#setupcookiejar)

## Functions

### setup

▸ **setup**(`instance`, `jar?`): [`ICookieJarAdapter`](../interfaces/adapter.ICookieJarAdapter.md)

Bind CookieJar to AxiosInstance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instance` | `AxiosInstance` | AxiosInstance. |
| `jar?` | [`ICookieJarAdapter`](../interfaces/adapter.ICookieJarAdapter.md) | CookieJar initial value, if not passed in, it will be created automatically (default `SimpleCookieJarAdapter`). Optional. |

#### Returns

[`ICookieJarAdapter`](../interfaces/adapter.ICookieJarAdapter.md)

The CookieJar bound to AxiosInstance.

**`Note`**

This function uses Axios interceptors, calling `interceptors.*.clear()` will cause the function to fail.

#### Defined in

index.ts:39

___

### setupCookieJar

▸ **setupCookieJar**(`instance`, `jar?`): [`ICookieJarAdapter`](../interfaces/adapter.ICookieJarAdapter.md)

Alias for setup.

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `AxiosInstance` |
| `jar?` | [`ICookieJarAdapter`](../interfaces/adapter.ICookieJarAdapter.md) |

#### Returns

[`ICookieJarAdapter`](../interfaces/adapter.ICookieJarAdapter.md)

**`See`**

setup

#### Defined in

index.ts:87

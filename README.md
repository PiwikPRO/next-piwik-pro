
<a name="readmemd"></a>


# Piwik PRO Library for Next.js

Dedicated Piwik PRO library that helps with implementing Piwik PRO Tag Manager and the Piwik PRO tracking client in
Next.js applications.

### Installation

To use this package in your project, run the following command.

#### npm

```sh
npm install @piwikpro/next-piwik-pro
```

#### Yarn

```sh
yarn add @piwikpro/next-piwik-pro
```

#### Basic setup

In your Next.js Project, include the default `PiwikProProvider` in the `layout.tsx` file. To set up the Piwik PRO Tag
Manager container in the app.

In the arguments, pass your container id and your container url as parameters (marked `container-id` and `container-url`
in the example below).

##### layout.tsx

```tsx
import PiwikProProvider from '@piwikpro/next-piwik-pro'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <PiwikProProvider
          containerId='container-id'
          containerUrl='container-url'
        >
          {children}
        </PiwikProProvider>
      </body>
    </html>
  )
}
```

#### Setup with pages router

In the `next.config.js` use `transpilePackages` option.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@piwikpro/next-piwik-pro']
}

module.exports = nextConfig
```

#### Setup with environmental variables

If you plan to use environmental variables to config your Piwik account you can do it with adding them to your `.env`
file. Remember that variables to be visible in component need to be named with `NEXT_PUBLIC_` prefix, in other cases
they will be visible only in Node context but not in Next.

##### .env

```sh
NEXT_PUBLIC_CONTAINER_ID=0a0b8661-8c10-4d59-e8fg-1h926ijkl184
NEXT_PUBLIC_CONTAINER_URL=https://example.piwik.pro
```

##### layout.tsx

```tsx
import PiwikProProvider from '@piwikpro/next-piwik-pro'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <PiwikProProvider
          containerUrl={process.env.NEXT_PUBLIC_CONTAINER_URL}
          containerId={process.env.NEXT_PUBLIC_CONTAINER_ID}
        >
          {children}
        </PiwikProProvider>
      </body>
    </html>
  )
}
```

#### Setup with nonce

The nonce attribute is useful to allow-list specific elements, such as a particular inline script or style elements. It
can help you to avoid using the CSP unsafe-inline directive, which would allow-list all inline scripts or styles.

If you want your nonce to be passed to the script, pass it as the third argument when calling the script initialization
method.

##### layout.tsx

```tsx
import PiwikProProvider from '@piwikpro/next-piwik-pro'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <PiwikProProvider
          containerId='container-id'
          containerUrl='container-url'
          nonce='nonce-string'
        >
          {children}
        </PiwikProProvider>
      </body>
    </html>
  )
}
```

### Usage

To use methods in your page you need to include `usePiwikPro` from the library.
Make sure to use `usePiwikPro` in client components only, otherwise you will get an error.
To make it work You need to use it in separated client component (`use component`)

```ts
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
```

Then you need to define modules you want to use and initialize it from previously included `usePiwikPro` context. In
example below you can see the initialization of the `PageViews` module.

```ts
const { PageViews } = usePiwikPro()
```

You can use those methods in all hooks and props for ex. `useEffect` or `onClick`.

#### useEffect

```tsx
useEffect(() => {
  PageViews.trackPageView('optional title')
}, [])
```

#### onClick

```tsx
<button
  onClick={() => {
    CustomEvent.trackEvent('Post', pageData.title)
  }}
>
  CustomEvent.trackEvent button
</button>
```


<a name="modulesmd"></a>



<a name="modulesnode_modules__piwikpro_react_piwik_pro_distmd"></a>



### Table of contents

#### Namespaces

- [ClientConfiguration](#modulesnode_modules__piwikpro_react_piwik_pro_distclientconfigurationmd)
- [ContentTracking](#modulesnode_modules__piwikpro_react_piwik_pro_distcontenttrackingmd)
- [CookieManagement](#modulesnode_modules__piwikpro_react_piwik_pro_distcookiemanagementmd)
- [CrossDomainTracking](#modulesnode_modules__piwikpro_react_piwik_pro_distcrossdomaintrackingmd)
- [CustomDimensions](#modulesnode_modules__piwikpro_react_piwik_pro_distcustomdimensionsmd)
- [CustomEvent](#modulesnode_modules__piwikpro_react_piwik_pro_distcustomeventmd)
- [DataLayer](#modulesnode_modules__piwikpro_react_piwik_pro_distdatalayermd)
- [DownloadAndOutlink](#modulesnode_modules__piwikpro_react_piwik_pro_distdownloadandoutlinkmd)
- [ErrorTracking](#modulesnode_modules__piwikpro_react_piwik_pro_disterrortrackingmd)
- [GoalConversions](#modulesnode_modules__piwikpro_react_piwik_pro_distgoalconversionsmd)
- [Heartbeat](#modulesnode_modules__piwikpro_react_piwik_pro_distheartbeatmd)
- [Miscellaneous](#modulesnode_modules__piwikpro_react_piwik_pro_distmiscellaneousmd)
- [PageViews](#modulesnode_modules__piwikpro_react_piwik_pro_distpageviewsmd)
- [SiteSearch](#modulesnode_modules__piwikpro_react_piwik_pro_distsitesearchmd)
- [UserManagement](#modulesnode_modules__piwikpro_react_piwik_pro_distusermanagementmd)
- [eCommerce](#modulesnode_modules__piwikpro_react_piwik_pro_distecommercemd)

#### Type Aliases

- [Dimensions](#dimensions)
- [EcommerceOptions](#ecommerceoptions)
- [InitOptions](#initoptions)
- [Initialize](#initialize)
- [PaymentInformation](#paymentinformation)
- [Product](#product)
- [VisitorInfo](#visitorinfo)

#### Variables

- [default](#default)

### Type Aliases

#### Dimensions

Ƭ **Dimensions**: `Record`\<\`dimension$\{number}\`, `string`\>

___

#### EcommerceOptions

Ƭ **EcommerceOptions**: `Object`

##### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `currencyCode?` | `string` | Currency code in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format. If not provided, the currency set in app settings will be used instead. |

___

#### InitOptions

Ƭ **InitOptions**: `Object`

##### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataLayerName?` | `string` | Defaults to 'dataLayer' |
| `nonce?` | `string` | - |

___

#### Initialize

Ƭ **Initialize**: (`containerId`: `string`, `containerUrl`: `string`, `nonceOrOptions?`: `string` \| [`InitOptions`](#initoptions)) => `void`

##### Type declaration

▸ (`containerId`, `containerUrl`, `nonceOrOptions?`): `void`

###### Parameters

| Name | Type |
| :------ | :------ |
| `containerId` | `string` |
| `containerUrl` | `string` |
| `nonceOrOptions?` | `string` \| [`InitOptions`](#initoptions) |

###### Returns

`void`

___

#### PaymentInformation

Ƭ **PaymentInformation**: `Object`

##### Type declaration

| Name | Type |
| :------ | :------ |
| `discount?` | `number` \| `string` |
| `grandTotal` | `number` \| `string` |
| `orderId` | `string` |
| `shipping?` | `number` \| `string` |
| `subTotal?` | `number` \| `string` |
| `tax?` | `number` \| `string` |

___

#### Product

Ƭ **Product**: `Object`

##### Type declaration

| Name | Type |
| :------ | :------ |
| `brand?` | `string` |
| `category?` | `LimitedArrayFiveStrings` |
| `customDimensions?` | `Record`\<`number`, `string`\> |
| `name?` | `string` |
| `price?` | `number` |
| `quantity?` | `number` |
| `sku` | `string` |
| `variant?` | `string` |

___

#### VisitorInfo

Ƭ **VisitorInfo**: [isNew: "0" \| "1", visitorId: string, firstVisitTS: number, previousVisitCount: string \| number, currentVisitTS: number, lastVisitTS: number \| "", lastEcommerceOrderTS: number \| ""]

### Variables

#### default

• `Const` **default**: typeof `PiwikPRO.default`



<a name="modulesnode_modules__piwikpro_react_piwik_pro_distclientconfigurationmd"></a>


## ClientConfiguration


### Table of contents


- [getDomains](#getdomains)
- [setDomains](#setdomains)


#### getDomains

▸ **getDomains**(): `Promise`\<`string`[]\>

Returns list of internal domains (set with "setDomains" function and used in outlink tracking).

##### Returns

`Promise`\<`string`[]\>

___

#### setDomains

▸ **setDomains**(`domains`): `void`

Allows to define a list of internal domains or mobile app URIs. Used in outlink tracking for determining whether a link is an outlink and in cross domain linking for determining which links should have visitor ID parameter injected.

##### Parameters

| Name | Type |
| :------ | :------ |
| `domains` | `string`[] |

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_distcontenttrackingmd"></a>


## ContentTracking


### Table of contents


- [logAllContentBlocksOnPage](#logallcontentblocksonpage)
- [trackAllContentImpressions](#trackallcontentimpressions)
- [trackContentImpression](#trackcontentimpression)
- [trackContentImpressionsWithinNode](#trackcontentimpressionswithinnode)
- [trackContentInteraction](#trackcontentinteraction)
- [trackContentInteractionNode](#trackcontentinteractionnode)
- [trackVisibleContentImpressions](#trackvisiblecontentimpressions)


#### logAllContentBlocksOnPage

▸ **logAllContentBlocksOnPage**(): `void`

Print all content blocks to the console for debugging purposes

##### Returns

`void`

___

#### trackAllContentImpressions

▸ **trackAllContentImpressions**(): `void`

Scans the entire DOM for content blocks and tracks impressions after all page
elements load. It does not send duplicates on repeated calls unless
trackPageView was called in between trackAllContentImpressions invocations

##### Returns

`void`

___

#### trackContentImpression

▸ **trackContentImpression**(`contentName`, `contentPiece`, `contentTarget`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `contentName` | `string` |
| `contentPiece` | `string` |
| `contentTarget` | `string` |

##### Returns

`void`

___

#### trackContentImpressionsWithinNode

▸ **trackContentImpressionsWithinNode**(`domNode`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `domNode` | `Node` |

##### Returns

`void`

___

#### trackContentInteraction

▸ **trackContentInteraction**(`contentInteraction`, `contentName`, `contentPiece`, `contentTarget`): `void`

Tracks manual content interaction event

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contentInteraction` | `string` | Type of interaction (e.g. "click") |
| `contentName` | `string` | Name of a content block |
| `contentPiece` | `string` | Name of the content that was displayed (e.g. link to an image) |
| `contentTarget` | `string` | Where the content leads to (e.g. URL of some external website) |

##### Returns

`void`

___

#### trackContentInteractionNode

▸ **trackContentInteractionNode**(`domNode`, `contentInteraction?`): `void`

Tracks interaction with a block in domNode. Can be called from code placed in onclick attribute

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `domNode` | `Node` | Node marked as content block or containing content blocks. If content block can’t be found, nothing will tracked. |
| `contentInteraction?` | `string` | Name of interaction (e.g. "click") |

##### Returns

`void`

___

#### trackVisibleContentImpressions

▸ **trackVisibleContentImpressions**(`checkOnScroll?`, `watchInterval?`): `void`

Scans DOM for all visible content blocks and tracks impressions

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `checkOnScroll?` | `boolean` | Whether to scan for visible content on scroll event |
| `watchInterval?` | `number` | Delay, in milliseconds, between scans for new visible content. Periodic checks can be disabled by passing 0 |

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_distcookiemanagementmd"></a>


## CookieManagement


### Table of contents


- [deleteCookies](#deletecookies)
- [disableCookies](#disablecookies)
- [enableCookies](#enablecookies)
- [getConfigVisitorCookieTimeout](#getconfigvisitorcookietimeout)
- [getCookieDomain](#getcookiedomain)
- [getCookiePath](#getcookiepath)
- [getSessionCookieTimeout](#getsessioncookietimeout)
- [hasCookies](#hascookies)
- [setCookieDomain](#setcookiedomain)
- [setCookieNamePrefix](#setcookienameprefix)
- [setCookiePath](#setcookiepath)
- [setReferralCookieTimeout](#setreferralcookietimeout)
- [setSecureCookie](#setsecurecookie)
- [setSessionCookieTimeout](#setsessioncookietimeout)
- [setVisitorCookieTimeout](#setvisitorcookietimeout)
- [setVisitorIdCookie](#setvisitoridcookie)


#### deleteCookies

▸ **deleteCookies**(): `void`

Deletes existing tracking cookies on the next page view

##### Returns

`void`

___

#### disableCookies

▸ **disableCookies**(): `void`

Disables all first party cookies. Existing cookies will be deleted in the next page view

##### Returns

`void`

___

#### enableCookies

▸ **enableCookies**(): `void`

Enables all first party cookies. Cookies will be created on the next tracking request

##### Returns

`void`

___

#### getConfigVisitorCookieTimeout

▸ **getConfigVisitorCookieTimeout**(): `Promise`\<`number`\>

Returns expiration time of visitor cookies (in milliseconds)

##### Returns

`Promise`\<`number`\>

___

#### getCookieDomain

▸ **getCookieDomain**(): `Promise`\<`string`\>

Returns domain of the analytics tracking cookies (set with setCookieDomain()).

##### Returns

`Promise`\<`string`\>

___

#### getCookiePath

▸ **getCookiePath**(): `Promise`\<`string`\>

Returns the analytics tracking cookies path

##### Returns

`Promise`\<`string`\>

___

#### getSessionCookieTimeout

▸ **getSessionCookieTimeout**(): `Promise`\<`number`\>

Returns expiration time of session cookies

##### Returns

`Promise`\<`number`\>

___

#### hasCookies

▸ **hasCookies**(): `Promise`\<`boolean`\>

Returns true if cookies are enabled in this browser

##### Returns

`Promise`\<`boolean`\>

___

#### setCookieDomain

▸ **setCookieDomain**(`domain`): `void`

Sets the domain for the analytics tracking cookies

##### Parameters

| Name | Type |
| :------ | :------ |
| `domain` | `string` |

##### Returns

`void`

___

#### setCookieNamePrefix

▸ **setCookieNamePrefix**(`prefix`): `void`

Sets the prefix for analytics tracking cookies. Default is "_pk_".

##### Parameters

| Name | Type |
| :------ | :------ |
| `prefix` | `string` |

##### Returns

`void`

___

#### setCookiePath

▸ **setCookiePath**(`path`): `void`

Sets the analytics tracking cookies path

##### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

##### Returns

`void`

___

#### setReferralCookieTimeout

▸ **setReferralCookieTimeout**(`seconds`): `void`

Sets the expiration time of referral cookies

##### Parameters

| Name | Type |
| :------ | :------ |
| `seconds` | `number` |

##### Returns

`void`

___

#### setSecureCookie

▸ **setSecureCookie**(`secure`): `void`

Toggles the secure cookie flag on all first party cookies (if you are using HTTPS)

##### Parameters

| Name | Type |
| :------ | :------ |
| `secure` | `boolean` |

##### Returns

`void`

___

#### setSessionCookieTimeout

▸ **setSessionCookieTimeout**(`seconds`): `void`

Sets the expiration time of session cookies

##### Parameters

| Name | Type |
| :------ | :------ |
| `seconds` | `number` |

##### Returns

`void`

___

#### setVisitorCookieTimeout

▸ **setVisitorCookieTimeout**(`seconds`): `void`

Sets the expiration time of visitor cookies

##### Parameters

| Name | Type |
| :------ | :------ |
| `seconds` | `number` |

##### Returns

`void`

___

#### setVisitorIdCookie

▸ **setVisitorIdCookie**(): `void`

Sets cookie containing [analytics ID](https://developers.piwik.pro/en/latest/glossary.html#term-analytics-id) in browser

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_distcrossdomaintrackingmd"></a>


## CrossDomainTracking


### Table of contents

#### Type Aliases

- [LinkDecorator](#linkdecorator)
- [VisitorIdGetter](#visitoridgetter)


- [customCrossDomainLinkDecorator](#customcrossdomainlinkdecorator)
- [customCrossDomainLinkVisitorIdGetter](#customcrossdomainlinkvisitoridgetter)
- [disableCrossDomainLinking](#disablecrossdomainlinking)
- [enableCrossDomainLinking](#enablecrossdomainlinking)
- [getCrossDomainLinkingUrlParameter](#getcrossdomainlinkingurlparameter)
- [isCrossDomainLinkingEnabled](#iscrossdomainlinkingenabled)
- [setCrossDomainLinkingTimeout](#setcrossdomainlinkingtimeout)

### Type Aliases

#### LinkDecorator

Ƭ **LinkDecorator**: (`url`: `string`, `value`: `string`, `name`: `string`) => `string` \| ``null``

##### Type declaration

▸ (`url`, `value`, `name`): `string` \| ``null``

###### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `value` | `string` |
| `name` | `string` |

###### Returns

`string` \| ``null``

___

#### VisitorIdGetter

Ƭ **VisitorIdGetter**: (`url`: `string`, `name`: `string`) => `string`

##### Type declaration

▸ (`url`, `name`): `string`

###### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `name` | `string` |

###### Returns

`string`


#### customCrossDomainLinkDecorator

▸ **customCrossDomainLinkDecorator**(`decorator`): `void`

Sets custom cross domains URL decorator for injecting visitor ID into URLs. Used when cross domain linking is enabled.

##### Parameters

| Name | Type |
| :------ | :------ |
| `decorator` | [`LinkDecorator`](#linkdecorator) |

##### Returns

`void`

___

#### customCrossDomainLinkVisitorIdGetter

▸ **customCrossDomainLinkVisitorIdGetter**(`getter`): `void`

Sets custom cross domain URL parser for extracting visitor ID from URLs. Should extract data injected by URL decorator. The getter should return visitor ID extracted from page URL.

##### Parameters

| Name | Type |
| :------ | :------ |
| `getter` | [`VisitorIdGetter`](#visitoridgetter) |

##### Returns

`void`

___

#### disableCrossDomainLinking

▸ **disableCrossDomainLinking**(): `void`

Disables cross domain linking.

##### Returns

`void`

___

#### enableCrossDomainLinking

▸ **enableCrossDomainLinking**(): `void`

Enables cross domain linking. Visitors across domains configured with "setDomains" function will be linked by passing visitor ID parameter in links.

##### Returns

`void`

___

#### getCrossDomainLinkingUrlParameter

▸ **getCrossDomainLinkingUrlParameter**(): `Promise`\<`string`\>

Returns the name of a cross domain URL parameter (query parameter by default) holding visitor ID. This is "pk_vid" by default.

##### Returns

`Promise`\<`string`\>

___

#### isCrossDomainLinkingEnabled

▸ **isCrossDomainLinkingEnabled**(): `Promise`\<`boolean`\>

Returns boolean telling whether cross domain linking is enabled.

##### Returns

`Promise`\<`boolean`\>

___

#### setCrossDomainLinkingTimeout

▸ **setCrossDomainLinkingTimeout**(`timeout`): `void`

Changes the time in which two visits across domains will be linked. The default timeout is 180 seconds (3 minutes).

##### Parameters

| Name | Type |
| :------ | :------ |
| `timeout` | `number` |

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_distcustomdimensionsmd"></a>


## CustomDimensions


### Table of contents


- [deleteCustomDimension](#deletecustomdimension)
- [getCustomDimensionValue](#getcustomdimensionvalue)
- [setCustomDimensionValue](#setcustomdimensionvalue)


#### deleteCustomDimension

▸ **deleteCustomDimension**(`customDimensionId`): `void`

Removes a custom dimension with the specified ID.

##### Parameters

| Name | Type |
| :------ | :------ |
| `customDimensionId` | `string` \| `number` |

##### Returns

`void`

___

#### getCustomDimensionValue

▸ **getCustomDimensionValue**(`customDimensionId`): `Promise`\<`string` \| `undefined`\>

Returns the value of a custom dimension with the specified ID.

##### Parameters

| Name | Type |
| :------ | :------ |
| `customDimensionId` | `string` \| `number` |

##### Returns

`Promise`\<`string` \| `undefined`\>

___

#### setCustomDimensionValue

▸ **setCustomDimensionValue**(`customDimensionId`, `customDimensionValue`): `void`

Sets a custom dimension value to be used later.

##### Parameters

| Name | Type |
| :------ | :------ |
| `customDimensionId` | `string` \| `number` |
| `customDimensionValue` | `string` |

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_distcustomeventmd"></a>


## CustomEvent


### Table of contents


- [trackEvent](#trackevent)


#### trackEvent

▸ **trackEvent**(`category`, `action`, `name?`, `value?`, `dimensions?`): `void`

Tracks a custom event, e.g. when a visitor interacts with the page

##### Parameters

| Name | Type |
| :------ | :------ |
| `category` | `string` |
| `action` | `string` |
| `name?` | `string` |
| `value?` | `number` |
| `dimensions?` | [`Dimensions`](#dimensions) |

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_distdatalayermd"></a>


## DataLayer


### Table of contents

#### Type Aliases

- [DataLayerEntry](#datalayerentry)


- [push](#push)
- [setDataLayerName](#setdatalayername)

### Type Aliases

#### DataLayerEntry

Ƭ **DataLayerEntry**: `Record`\<`string`, `AnyData`\>


#### push

▸ **push**(`data`): `number`

Adds entry to a data layer

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`DataLayerEntry`](#datalayerentry) |

##### Returns

`number`

___

#### setDataLayerName

▸ **setDataLayerName**(`name`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_distdownloadandoutlinkmd"></a>


## DownloadAndOutlink


### Table of contents


- [addDownloadExtensions](#adddownloadextensions)
- [enableLinkTracking](#enablelinktracking)
- [getLinkTrackingTimer](#getlinktrackingtimer)
- [removeDownloadExtensions](#removedownloadextensions)
- [setDownloadClasses](#setdownloadclasses)
- [setDownloadExtensions](#setdownloadextensions)
- [setIgnoreClasses](#setignoreclasses)
- [setLinkClasses](#setlinkclasses)
- [setLinkTrackingTimer](#setlinktrackingtimer)
- [trackLink](#tracklink)


#### addDownloadExtensions

▸ **addDownloadExtensions**(`extensions`): `void`

Adds new extensions to the download extensions list

##### Parameters

| Name | Type |
| :------ | :------ |
| `extensions` | `string`[] |

##### Returns

`void`

___

#### enableLinkTracking

▸ **enableLinkTracking**(`trackAlsoMiddleAndRightClicks?`): `void`

Enables automatic link tracking. If called with `true`, left, right and
middle clicks on links will be treated as opening a link. Opening a links to
an external site (different domain) creates an outlink event. Opening a link
to a downloadable file creates a download event

##### Parameters

| Name | Type |
| :------ | :------ |
| `trackAlsoMiddleAndRightClicks?` | `boolean` |

##### Returns

`void`

___

#### getLinkTrackingTimer

▸ **getLinkTrackingTimer**(): `Promise`\<`number`\>

Returns lock/wait time after a request set by setLinkTrackingTimer

##### Returns

`Promise`\<`number`\>

___

#### removeDownloadExtensions

▸ **removeDownloadExtensions**(`extensions`): `void`

Removes extensions from the download extensions list

##### Parameters

| Name | Type |
| :------ | :------ |
| `extensions` | `string`[] |

##### Returns

`void`

___

#### setDownloadClasses

▸ **setDownloadClasses**(`classes`): `void`

Sets a list of class names that indicate whether a list is a download and not an outlink

##### Parameters

| Name | Type |
| :------ | :------ |
| `classes` | `string`[] |

##### Returns

`void`

___

#### setDownloadExtensions

▸ **setDownloadExtensions**(`extensions`): `void`

Overwrites the list of file extensions indicating that a link is a download

##### Parameters

| Name | Type |
| :------ | :------ |
| `extensions` | `string`[] |

##### Returns

`void`

___

#### setIgnoreClasses

▸ **setIgnoreClasses**(`classes`): `void`

Set a list of class names that indicate a link should not be tracked

##### Parameters

| Name | Type |
| :------ | :------ |
| `classes` | `string`[] |

##### Returns

`void`

___

#### setLinkClasses

▸ **setLinkClasses**(`classes`): `void`

Sets a list of class names that indicate whether a link is an outlink and not download

##### Parameters

| Name | Type |
| :------ | :------ |
| `classes` | `string`[] |

##### Returns

`void`

___

#### setLinkTrackingTimer

▸ **setLinkTrackingTimer**(`time`): `void`

When a visitor produces an events and closes the page immediately afterwards,
e.g. when opening a link, the request might get cancelled. To avoid loosing
the last event this way, JavaScript Tracking Client will lock the page for a
fraction of a second (if wait time hasn’t passed), giving the request time to
reach the Collecting & Processing Pipeline

##### Parameters

| Name | Type |
| :------ | :------ |
| `time` | `number` |

##### Returns

`void`

___

#### trackLink

▸ **trackLink**(`url`, `linkType`, `dimensions?`, `callback?`): `void`

Manually tracks outlink or download event with provided values

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `linkType` | `string` |
| `dimensions?` | [`Dimensions`](#dimensions) |
| `callback?` | () => `void` |

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_disterrortrackingmd"></a>


## ErrorTracking


### Table of contents


- [enableJSErrorTracking](#enablejserrortracking)
- [trackError](#trackerror)


#### enableJSErrorTracking

▸ **enableJSErrorTracking**(`unique?`): `void`

Enables tracking of unhandled JavaScript errors.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unique?` | `boolean` | track only unique errors |

##### Returns

`void`

___

#### trackError

▸ **trackError**(`error`): `void`

Attempts to send error tracking request using same format as native errors caught by enableJSErrorTracking().
Such error request will still follow rules set for tracker, so it will be sent only when JS error tracking is enabled
([enableJSErrorTracking](#enablejserrortracking) function was called before this attempt). It will also respect rules for tracking only unique errors.

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_distgoalconversionsmd"></a>


## GoalConversions


### Table of contents


- [trackGoal](#trackgoal)


#### trackGoal

▸ **trackGoal**(`goalId`, `conversionValue`, `dimensions?`, `options?`): `void`

Tracks manual goal conversion

##### Parameters

| Name | Type |
| :------ | :------ |
| `goalId` | `string` \| `number` |
| `conversionValue` | `number` |
| `dimensions?` | [`Dimensions`](#dimensions) |
| `options?` | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_distheartbeatmd"></a>


## Heartbeat


### Table of contents


- [disableHeartBeatTimer](#disableheartbeattimer)
- [enableHeartBeatTimer](#enableheartbeattimer)


#### disableHeartBeatTimer

▸ **disableHeartBeatTimer**(): `void`

Disables sending heartbeats if they were previously enabled by "enableHeartBeatTimer" function.

##### Returns

`void`

___

#### enableHeartBeatTimer

▸ **enableHeartBeatTimer**(`delays?`): `void`

When a visitor is not producing any events (e.g. because they are reading an article or watching a video), we don’t know if they are still on the page. This might skew page statistics, e.g. time on page value. Heartbeat timer allows us to determine how much time visitors spend on a page by sending heartbeats to the Tracker as long as the page is in focus.

##### Parameters

| Name | Type |
| :------ | :------ |
| `delays?` | `number`[] |

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_distmiscellaneousmd"></a>


## Miscellaneous


### Table of contents


- [setTrackingSourceProvider](#settrackingsourceprovider)


#### setTrackingSourceProvider

▸ **setTrackingSourceProvider**(`provider`, `version`): `void`

Adds metadata about used framework

##### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `string` |
| `version` | `string` |

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_distpageviewsmd"></a>


## PageViews


### Table of contents


- [trackPageView](#trackpageview)


#### trackPageView

▸ **trackPageView**(`customPageTitle?`): `void`

Tracks a visit on the page that the function was run on

##### Parameters

| Name | Type |
| :------ | :------ |
| `customPageTitle?` | `string` |

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_distsitesearchmd"></a>


## SiteSearch


### Table of contents


- [trackSiteSearch](#tracksitesearch)


#### trackSiteSearch

▸ **trackSiteSearch**(`keyword`, `category?`, `searchCount?`, `dimensions?`): `void`

Tracks search requests on a website

##### Parameters

| Name | Type |
| :------ | :------ |
| `keyword` | `string` |
| `category?` | `string` |
| `searchCount?` | `number` |
| `dimensions?` | [`Dimensions`](#dimensions) |

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_distusermanagementmd"></a>


## UserManagement


### Table of contents


- [deanonymizeUser](#deanonymizeuser)
- [getUserId](#getuserid)
- [getVisitorId](#getvisitorid)
- [getVisitorInfo](#getvisitorinfo)
- [resetUserId](#resetuserid)
- [setUserId](#setuserid)
- [setUserIsAnonymous](#setuserisanonymous)


#### deanonymizeUser

▸ **deanonymizeUser**(): `void`

Disables anonymous tracking and sends deanonymization event to the Tracker. Recommended method for disabling anonymous tracking.

##### Returns

`void`

___

#### getUserId

▸ **getUserId**(): `Promise`\<`string`\>

The function that will return user ID

##### Returns

`Promise`\<`string`\>

___

#### getVisitorId

▸ **getVisitorId**(): `Promise`\<`string`\>

Returns 16-character hex ID of the visitor

##### Returns

`Promise`\<`string`\>

___

#### getVisitorInfo

▸ **getVisitorInfo**(): `Promise`\<[`VisitorInfo`](#visitorinfo)\>

Returns visitor information in an array

##### Returns

`Promise`\<[`VisitorInfo`](#visitorinfo)\>

___

#### resetUserId

▸ **resetUserId**(): `void`

Clears previously set userID, e.g. when visitor logs out

##### Returns

`void`

___

#### setUserId

▸ **setUserId**(`userId`): `void`

User ID is an additional parameter that allows you to aggregate data. When
set up, you will be able to search through sessions by this parameter, filter
reports through it or create Multi attribution reports using User ID

##### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

##### Returns

`void`

___

#### setUserIsAnonymous

▸ **setUserIsAnonymous**(`isAnonymous`): `void`

Enables or disables anonymous tracking (anonymous = without consent). The next emitted event will have anonymous mode set accordingly.

##### Parameters

| Name | Type |
| :------ | :------ |
| `isAnonymous` | `boolean` |

##### Returns

`void`


<a name="modulesnode_modules__piwikpro_react_piwik_pro_distecommercemd"></a>


## eCommerce


### Table of contents


- [addEcommerceItem](#addecommerceitem)
- [clearEcommerceCart](#clearecommercecart)
- [ecommerceAddToCart](#ecommerceaddtocart)
- [ecommerceCartUpdate](#ecommercecartupdate)
- [ecommerceOrder](#ecommerceorder)
- [ecommerceProductDetailView](#ecommerceproductdetailview)
- [ecommerceRemoveFromCart](#ecommerceremovefromcart)
- [getEcommerceItems](#getecommerceitems)
- [removeEcommerceItem](#removeecommerceitem)
- [setEcommerceView](#setecommerceview)
- [trackEcommerceCartUpdate](#trackecommercecartupdate)
- [trackEcommerceOrder](#trackecommerceorder)


#### addEcommerceItem

▸ **addEcommerceItem**(`productSKU`, `productName`, `productCategory`, `productPrice`, `productQuantity`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `productSKU` | `string` |
| `productName` | `string` |
| `productCategory` | `string` \| `string`[] |
| `productPrice` | `number` |
| `productQuantity` | `number` |

##### Returns

`void`

**`Deprecated`**

Please use the ecommerceAddToCart instead.

___

#### clearEcommerceCart

▸ **clearEcommerceCart**(): `void`

##### Returns

`void`

**`Deprecated`**

___

#### ecommerceAddToCart

▸ **ecommerceAddToCart**(`products`, `options?`): `void`

Tracks action of adding products to a cart

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |
| `options?` | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

___

#### ecommerceCartUpdate

▸ **ecommerceCartUpdate**(`products`, `grandTotal`, `options?`): `void`

Tracks current state of a cart

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |
| `grandTotal` | `string` \| `number` |
| `options?` | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

___

#### ecommerceOrder

▸ **ecommerceOrder**(`products`, `paymentInformation`, `options?`): `void`

Tracks conversion, including products and payment details

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |
| `paymentInformation` | [`PaymentInformation`](#paymentinformation) |
| `options?` | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

___

#### ecommerceProductDetailView

▸ **ecommerceProductDetailView**(`products`, `options?`): `void`

Tracks action of viewing product page

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |
| `options?` | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

___

#### ecommerceRemoveFromCart

▸ **ecommerceRemoveFromCart**(`products`, `options?`): `void`

Tracks action of removing a products from a cart

##### Parameters

| Name | Type |
| :------ | :------ |
| `products` | [`Product`](#product)[] |
| `options?` | [`EcommerceOptions`](#ecommerceoptions) |

##### Returns

`void`

___

#### getEcommerceItems

▸ **getEcommerceItems**(): `Promise`\<`object`\>

##### Returns

`Promise`\<`object`\>

**`Deprecated`**

___

#### removeEcommerceItem

▸ **removeEcommerceItem**(`productSKU`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `productSKU` | `string` |

##### Returns

`void`

**`Deprecated`**

Please use the ecommerceRemoveFromCart instead.

___

#### setEcommerceView

▸ **setEcommerceView**(`productSKU`, `productName?`, `productCategory?`, `productPrice?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `productSKU` | `string` |
| `productName?` | `string` |
| `productCategory?` | `string`[] |
| `productPrice?` | `string` |

##### Returns

`void`

**`Deprecated`**

___

#### trackEcommerceCartUpdate

▸ **trackEcommerceCartUpdate**(`cartAmount`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cartAmount` | `number` |

##### Returns

`void`

**`Deprecated`**

Please use the ecommerceCartUpdate instead.

___

#### trackEcommerceOrder

▸ **trackEcommerceOrder**(`orderId`, `orderGrandTotal`, `orderSubTotal?`, `orderTax?`, `orderShipping?`, `orderDiscount?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |
| `orderGrandTotal` | `number` |
| `orderSubTotal?` | `number` |
| `orderTax?` | `number` |
| `orderShipping?` | `number` |
| `orderDiscount?` | `number` |

##### Returns

`void`

**`Deprecated`**

Please use the ecommerceOrder instead.



<a name="modulessrcmd"></a>


## Module: src

### Table of contents

#### Type Aliases

- [PiwikProProviderProps](#piwikproproviderprops)


- [default](#default)
- [usePiwikPro](#usepiwikpro)

### Type Aliases

#### PiwikProProviderProps

Ƭ **PiwikProProviderProps**: \{ `children`: `ReactNode` ; `containerId`: `string` ; `containerUrl`: `string`  } & [`InitOptions`](#initoptions)


#### default

▸ **default**(`props`, `context?`): `ReactNode`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`PiwikProProviderProps`](#piwikproproviderprops) |
| `context?` | `any` |

##### Returns

`ReactNode`

___

#### usePiwikPro

▸ **usePiwikPro**(): `__module`

##### Returns

`__module`

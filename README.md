
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
NEXT_PUBLIC_CONTAINER_ID=0a0b8661-8c10-4d59-a8ef-11926abc4184
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


***








### Table of contents

- [ClientConfiguration](#namespacesclientconfigurationreadmemd)
- [ContentTracking](#namespacescontenttrackingreadmemd)
- [CookieManagement](#namespacescookiemanagementreadmemd)
- [CrossDomainTracking](#namespacescrossdomaintrackingreadmemd)
- [CustomDimensions](#namespacescustomdimensionsreadmemd)
- [CustomEvent](#namespacescustomeventreadmemd)
- [DataLayer](#namespacesdatalayerreadmemd)
- [DownloadAndOutlink](#namespacesdownloadandoutlinkreadmemd)
- [eCommerce](#namespacesecommercereadmemd)
- [ErrorTracking](#namespaceserrortrackingreadmemd)
- [GoalConversions](#namespacesgoalconversionsreadmemd)
- [Heartbeat](#namespacesheartbeatreadmemd)
- [Miscellaneous](#namespacesmiscellaneousreadmemd)
- [PageViews](#namespacespageviewsreadmemd)
- [SiteSearch](#namespacessitesearchreadmemd)
- [UserManagement](#namespacesusermanagementreadmemd)

### Type Aliases

- [Dimensions](#type-aliasesdimensionsmd)
- [EcommerceOptions](#type-aliasesecommerceoptionsmd)
- [GetInitScript](#type-aliasesgetinitscriptmd)
- [Initialize](#type-aliasesinitializemd)
- [InitOptions](#type-aliasesinitoptionsmd)
- [PaymentInformation](#type-aliasespaymentinformationmd)
- [Product](#type-aliasesproductmd)
- [VisitorInfo](#type-aliasesvisitorinfomd)

### Variables

- [default](#variablesdefaultmd)


<a name="namespacesclientconfigurationreadmemd"></a>


***


## ClientConfiguration


- [getDomains](#namespacesclientconfigurationfunctionsgetdomainsmd)
- [setDomains](#namespacesclientconfigurationfunctionssetdomainsmd)


<a name="namespacesclientconfigurationfunctionsgetdomainsmd"></a>


***


## getDomains()

> **getDomains**(): `Promise`\<`string`[]\>

Returns list of internal domains (set with "setDomains" function and used in outlink tracking).

### Returns

`Promise`\<`string`[]\>


<a name="namespacesclientconfigurationfunctionssetdomainsmd"></a>


***


## setDomains()

> **setDomains**(`domains`): `void`

Allows to define a list of internal domains or mobile app URIs. Used in outlink tracking for determining whether a link is an outlink and in cross domain linking for determining which links should have visitor ID parameter injected.

### Parameters

| Parameter | Type |
| ------ | ------ |
| `domains` | `string`[] |

### Returns

`void`


<a name="namespacescontenttrackingreadmemd"></a>


***


## ContentTracking


- [logAllContentBlocksOnPage](#namespacescontenttrackingfunctionslogallcontentblocksonpagemd)
- [trackAllContentImpressions](#namespacescontenttrackingfunctionstrackallcontentimpressionsmd)
- [trackContentImpression](#namespacescontenttrackingfunctionstrackcontentimpressionmd)
- [trackContentImpressionsWithinNode](#namespacescontenttrackingfunctionstrackcontentimpressionswithinnodemd)
- [trackContentInteraction](#namespacescontenttrackingfunctionstrackcontentinteractionmd)
- [trackContentInteractionNode](#namespacescontenttrackingfunctionstrackcontentinteractionnodemd)
- [trackVisibleContentImpressions](#namespacescontenttrackingfunctionstrackvisiblecontentimpressionsmd)


<a name="namespacescontenttrackingfunctionslogallcontentblocksonpagemd"></a>


***


## logAllContentBlocksOnPage()

> **logAllContentBlocksOnPage**(): `void`

Print all content blocks to the console for debugging purposes

### Returns

`void`


<a name="namespacescontenttrackingfunctionstrackallcontentimpressionsmd"></a>


***


## trackAllContentImpressions()

> **trackAllContentImpressions**(): `void`

Scans the entire DOM for content blocks and tracks impressions after all page
elements load. It does not send duplicates on repeated calls unless
trackPageView was called in between trackAllContentImpressions invocations

### Returns

`void`


<a name="namespacescontenttrackingfunctionstrackcontentimpressionmd"></a>


***


## trackContentImpression()

> **trackContentImpression**(`contentName`, `contentPiece`, `contentTarget`): `void`

### Parameters

| Parameter | Type |
| ------ | ------ |
| `contentName` | `string` |
| `contentPiece` | `string` |
| `contentTarget` | `string` |

### Returns

`void`


<a name="namespacescontenttrackingfunctionstrackcontentimpressionswithinnodemd"></a>


***


## trackContentImpressionsWithinNode()

> **trackContentImpressionsWithinNode**(`domNode`): `void`

### Parameters

| Parameter | Type |
| ------ | ------ |
| `domNode` | `Node` |

### Returns

`void`


<a name="namespacescontenttrackingfunctionstrackcontentinteractionmd"></a>


***


## trackContentInteraction()

> **trackContentInteraction**(`contentInteraction`, `contentName`, `contentPiece`, `contentTarget`): `void`

Tracks manual content interaction event

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `contentInteraction` | `string` | Type of interaction (e.g. "click") |
| `contentName` | `string` | Name of a content block |
| `contentPiece` | `string` | Name of the content that was displayed (e.g. link to an image) |
| `contentTarget` | `string` | Where the content leads to (e.g. URL of some external website) |

### Returns

`void`


<a name="namespacescontenttrackingfunctionstrackcontentinteractionnodemd"></a>


***


## trackContentInteractionNode()

> **trackContentInteractionNode**(`domNode`, `contentInteraction?`): `void`

Tracks interaction with a block in domNode. Can be called from code placed in onclick attribute

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `domNode` | `Node` | Node marked as content block or containing content blocks. If content block can’t be found, nothing will tracked. |
| `contentInteraction?` | `string` | Name of interaction (e.g. "click") |

### Returns

`void`


<a name="namespacescontenttrackingfunctionstrackvisiblecontentimpressionsmd"></a>


***


## trackVisibleContentImpressions()

> **trackVisibleContentImpressions**(`checkOnScroll?`, `watchInterval?`): `void`

Scans DOM for all visible content blocks and tracks impressions

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `checkOnScroll?` | `boolean` | Whether to scan for visible content on scroll event |
| `watchInterval?` | `number` | Delay, in milliseconds, between scans for new visible content. Periodic checks can be disabled by passing 0 |

### Returns

`void`


<a name="namespacescookiemanagementreadmemd"></a>


***


## CookieManagement


- [deleteCookies](#namespacescookiemanagementfunctionsdeletecookiesmd)
- [disableCookies](#namespacescookiemanagementfunctionsdisablecookiesmd)
- [enableCookies](#namespacescookiemanagementfunctionsenablecookiesmd)
- [getConfigVisitorCookieTimeout](#namespacescookiemanagementfunctionsgetconfigvisitorcookietimeoutmd)
- [getCookieDomain](#namespacescookiemanagementfunctionsgetcookiedomainmd)
- [getCookiePath](#namespacescookiemanagementfunctionsgetcookiepathmd)
- [getSessionCookieTimeout](#namespacescookiemanagementfunctionsgetsessioncookietimeoutmd)
- [hasCookies](#namespacescookiemanagementfunctionshascookiesmd)
- [setCookieDomain](#namespacescookiemanagementfunctionssetcookiedomainmd)
- [setCookieNamePrefix](#namespacescookiemanagementfunctionssetcookienameprefixmd)
- [setCookiePath](#namespacescookiemanagementfunctionssetcookiepathmd)
- [setReferralCookieTimeout](#namespacescookiemanagementfunctionssetreferralcookietimeoutmd)
- [setSecureCookie](#namespacescookiemanagementfunctionssetsecurecookiemd)
- [setSessionCookieTimeout](#namespacescookiemanagementfunctionssetsessioncookietimeoutmd)
- [setVisitorCookieTimeout](#namespacescookiemanagementfunctionssetvisitorcookietimeoutmd)
- [setVisitorIdCookie](#namespacescookiemanagementfunctionssetvisitoridcookiemd)


<a name="namespacescookiemanagementfunctionsdeletecookiesmd"></a>


***


## deleteCookies()

> **deleteCookies**(): `void`

Deletes existing tracking cookies on the next page view

### Returns

`void`


<a name="namespacescookiemanagementfunctionsdisablecookiesmd"></a>


***


## disableCookies()

> **disableCookies**(): `void`

Disables all first party cookies. Existing cookies will be deleted in the next page view

### Returns

`void`


<a name="namespacescookiemanagementfunctionsenablecookiesmd"></a>


***


## enableCookies()

> **enableCookies**(): `void`

Enables all first party cookies. Cookies will be created on the next tracking request

### Returns

`void`


<a name="namespacescookiemanagementfunctionsgetconfigvisitorcookietimeoutmd"></a>


***


## getConfigVisitorCookieTimeout()

> **getConfigVisitorCookieTimeout**(): `Promise`\<`number`\>

Returns expiration time of visitor cookies (in milliseconds)

### Returns

`Promise`\<`number`\>


<a name="namespacescookiemanagementfunctionsgetcookiedomainmd"></a>


***


## getCookieDomain()

> **getCookieDomain**(): `Promise`\<`string`\>

Returns domain of the analytics tracking cookies (set with setCookieDomain()).

### Returns

`Promise`\<`string`\>


<a name="namespacescookiemanagementfunctionsgetcookiepathmd"></a>


***


## getCookiePath()

> **getCookiePath**(): `Promise`\<`string`\>

Returns the analytics tracking cookies path

### Returns

`Promise`\<`string`\>


<a name="namespacescookiemanagementfunctionsgetsessioncookietimeoutmd"></a>


***


## getSessionCookieTimeout()

> **getSessionCookieTimeout**(): `Promise`\<`number`\>

Returns expiration time of session cookies

### Returns

`Promise`\<`number`\>


<a name="namespacescookiemanagementfunctionshascookiesmd"></a>


***


## hasCookies()

> **hasCookies**(): `Promise`\<`boolean`\>

Returns true if cookies are enabled in this browser

### Returns

`Promise`\<`boolean`\>


<a name="namespacescookiemanagementfunctionssetcookiedomainmd"></a>


***


## setCookieDomain()

> **setCookieDomain**(`domain`): `void`

Sets the domain for the analytics tracking cookies

### Parameters

| Parameter | Type |
| ------ | ------ |
| `domain` | `string` |

### Returns

`void`


<a name="namespacescookiemanagementfunctionssetcookienameprefixmd"></a>


***


## setCookieNamePrefix()

> **setCookieNamePrefix**(`prefix`): `void`

Sets the prefix for analytics tracking cookies. Default is "_pk_".

### Parameters

| Parameter | Type |
| ------ | ------ |
| `prefix` | `string` |

### Returns

`void`


<a name="namespacescookiemanagementfunctionssetcookiepathmd"></a>


***


## setCookiePath()

> **setCookiePath**(`path`): `void`

Sets the analytics tracking cookies path

### Parameters

| Parameter | Type |
| ------ | ------ |
| `path` | `string` |

### Returns

`void`


<a name="namespacescookiemanagementfunctionssetreferralcookietimeoutmd"></a>


***


## setReferralCookieTimeout()

> **setReferralCookieTimeout**(`seconds`): `void`

Sets the expiration time of referral cookies

### Parameters

| Parameter | Type |
| ------ | ------ |
| `seconds` | `number` |

### Returns

`void`


<a name="namespacescookiemanagementfunctionssetsecurecookiemd"></a>


***


## setSecureCookie()

> **setSecureCookie**(`secure`): `void`

Toggles the secure cookie flag on all first party cookies (if you are using HTTPS)

### Parameters

| Parameter | Type |
| ------ | ------ |
| `secure` | `boolean` |

### Returns

`void`


<a name="namespacescookiemanagementfunctionssetsessioncookietimeoutmd"></a>


***


## setSessionCookieTimeout()

> **setSessionCookieTimeout**(`seconds`): `void`

Sets the expiration time of session cookies

### Parameters

| Parameter | Type |
| ------ | ------ |
| `seconds` | `number` |

### Returns

`void`


<a name="namespacescookiemanagementfunctionssetvisitorcookietimeoutmd"></a>


***


## setVisitorCookieTimeout()

> **setVisitorCookieTimeout**(`seconds`): `void`

Sets the expiration time of visitor cookies

### Parameters

| Parameter | Type |
| ------ | ------ |
| `seconds` | `number` |

### Returns

`void`


<a name="namespacescookiemanagementfunctionssetvisitoridcookiemd"></a>


***


## setVisitorIdCookie()

> **setVisitorIdCookie**(): `void`

Sets cookie containing [analytics ID](https://developers.piwik.pro/en/latest/glossary.html#term-analytics-id) in browser

### Returns

`void`


<a name="namespacescrossdomaintrackingreadmemd"></a>


***


## CrossDomainTracking

### Type Aliases

- [LinkDecorator](#namespacescrossdomaintrackingtype-aliaseslinkdecoratormd)
- [VisitorIdGetter](#namespacescrossdomaintrackingtype-aliasesvisitoridgettermd)


- [customCrossDomainLinkDecorator](#namespacescrossdomaintrackingfunctionscustomcrossdomainlinkdecoratormd)
- [customCrossDomainLinkVisitorIdGetter](#namespacescrossdomaintrackingfunctionscustomcrossdomainlinkvisitoridgettermd)
- [disableCrossDomainLinking](#namespacescrossdomaintrackingfunctionsdisablecrossdomainlinkingmd)
- [enableCrossDomainLinking](#namespacescrossdomaintrackingfunctionsenablecrossdomainlinkingmd)
- [getCrossDomainLinkingUrlParameter](#namespacescrossdomaintrackingfunctionsgetcrossdomainlinkingurlparametermd)
- [isCrossDomainLinkingEnabled](#namespacescrossdomaintrackingfunctionsiscrossdomainlinkingenabledmd)
- [setCrossDomainLinkingTimeout](#namespacescrossdomaintrackingfunctionssetcrossdomainlinkingtimeoutmd)


<a name="namespacescrossdomaintrackingfunctionscustomcrossdomainlinkdecoratormd"></a>


***


## customCrossDomainLinkDecorator()

> **customCrossDomainLinkDecorator**(`decorator`): `void`

Sets custom cross domains URL decorator for injecting visitor ID into URLs. Used when cross domain linking is enabled.

### Parameters

| Parameter | Type |
| ------ | ------ |
| `decorator` | [`LinkDecorator`](#namespacescrossdomaintrackingtype-aliaseslinkdecoratormd) |

### Returns

`void`


<a name="namespacescrossdomaintrackingfunctionscustomcrossdomainlinkvisitoridgettermd"></a>


***


## customCrossDomainLinkVisitorIdGetter()

> **customCrossDomainLinkVisitorIdGetter**(`getter`): `void`

Sets custom cross domain URL parser for extracting visitor ID from URLs. Should extract data injected by URL decorator. The getter should return visitor ID extracted from page URL.

### Parameters

| Parameter | Type |
| ------ | ------ |
| `getter` | [`VisitorIdGetter`](#namespacescrossdomaintrackingtype-aliasesvisitoridgettermd) |

### Returns

`void`


<a name="namespacescrossdomaintrackingfunctionsdisablecrossdomainlinkingmd"></a>


***


## disableCrossDomainLinking()

> **disableCrossDomainLinking**(): `void`

Disables cross domain linking.

### Returns

`void`


<a name="namespacescrossdomaintrackingfunctionsenablecrossdomainlinkingmd"></a>


***


## enableCrossDomainLinking()

> **enableCrossDomainLinking**(): `void`

Enables cross domain linking. Visitors across domains configured with "setDomains" function will be linked by passing visitor ID parameter in links.

### Returns

`void`


<a name="namespacescrossdomaintrackingfunctionsgetcrossdomainlinkingurlparametermd"></a>


***


## getCrossDomainLinkingUrlParameter()

> **getCrossDomainLinkingUrlParameter**(): `Promise`\<`string`\>

Returns the name of a cross domain URL parameter (query parameter by default) holding visitor ID. This is "pk_vid" by default.

### Returns

`Promise`\<`string`\>


<a name="namespacescrossdomaintrackingfunctionsiscrossdomainlinkingenabledmd"></a>


***


## isCrossDomainLinkingEnabled()

> **isCrossDomainLinkingEnabled**(): `Promise`\<`boolean`\>

Returns boolean telling whether cross domain linking is enabled.

### Returns

`Promise`\<`boolean`\>


<a name="namespacescrossdomaintrackingfunctionssetcrossdomainlinkingtimeoutmd"></a>


***


## setCrossDomainLinkingTimeout()

> **setCrossDomainLinkingTimeout**(`timeout`): `void`

Changes the time in which two visits across domains will be linked. The default timeout is 180 seconds (3 minutes).

### Parameters

| Parameter | Type |
| ------ | ------ |
| `timeout` | `number` |

### Returns

`void`


<a name="namespacescrossdomaintrackingtype-aliaseslinkdecoratormd"></a>


***


## LinkDecorator

> **LinkDecorator** = (`url`, `value`, `name`) => `string` \| `null`

### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `value` | `string` |
| `name` | `string` |

### Returns

`string` \| `null`


<a name="namespacescrossdomaintrackingtype-aliasesvisitoridgettermd"></a>


***


## VisitorIdGetter

> **VisitorIdGetter** = (`url`, `name`) => `string`

### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `name` | `string` |

### Returns

`string`


<a name="namespacescustomdimensionsreadmemd"></a>


***


## CustomDimensions


- [deleteCustomDimension](#namespacescustomdimensionsfunctionsdeletecustomdimensionmd)
- [getCustomDimensionValue](#namespacescustomdimensionsfunctionsgetcustomdimensionvaluemd)
- [setCustomDimensionValue](#namespacescustomdimensionsfunctionssetcustomdimensionvaluemd)


<a name="namespacescustomdimensionsfunctionsdeletecustomdimensionmd"></a>


***


## deleteCustomDimension()

> **deleteCustomDimension**(`customDimensionId`): `void`

Removes a custom dimension with the specified ID.

### Parameters

| Parameter | Type |
| ------ | ------ |
| `customDimensionId` | `string` \| `number` |

### Returns

`void`


<a name="namespacescustomdimensionsfunctionsgetcustomdimensionvaluemd"></a>


***


## getCustomDimensionValue()

> **getCustomDimensionValue**(`customDimensionId`): `Promise`\<`string` \| `undefined`\>

Returns the value of a custom dimension with the specified ID.

### Parameters

| Parameter | Type |
| ------ | ------ |
| `customDimensionId` | `string` \| `number` |

### Returns

`Promise`\<`string` \| `undefined`\>


<a name="namespacescustomdimensionsfunctionssetcustomdimensionvaluemd"></a>


***


## setCustomDimensionValue()

> **setCustomDimensionValue**(`customDimensionId`, `customDimensionValue`): `void`

Sets a custom dimension value to be used later.

### Parameters

| Parameter | Type |
| ------ | ------ |
| `customDimensionId` | `string` \| `number` |
| `customDimensionValue` | `string` |

### Returns

`void`


<a name="namespacescustomeventreadmemd"></a>


***


## CustomEvent


- [trackEvent](#namespacescustomeventfunctionstrackeventmd)


<a name="namespacescustomeventfunctionstrackeventmd"></a>


***


## trackEvent()

> **trackEvent**(`category`, `action`, `name?`, `value?`, `dimensions?`): `void`

Tracks a custom event, e.g. when a visitor interacts with the page

### Parameters

| Parameter | Type |
| ------ | ------ |
| `category` | `string` |
| `action` | `string` |
| `name?` | `string` |
| `value?` | `number` |
| `dimensions?` | [`Dimensions`](#type-aliasesdimensionsmd) |

### Returns

`void`


<a name="namespacesdatalayerreadmemd"></a>


***


## DataLayer

### Type Aliases

- [DataLayerEntry](#namespacesdatalayertype-aliasesdatalayerentrymd)


- [push](#namespacesdatalayerfunctionspushmd)
- [setDataLayerName](#namespacesdatalayerfunctionssetdatalayernamemd)


<a name="namespacesdatalayerfunctionspushmd"></a>


***


## push()

> **push**(`data`): `number`

Adds entry to a data layer

### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | [`DataLayerEntry`](#namespacesdatalayertype-aliasesdatalayerentrymd) |

### Returns

`number`


<a name="namespacesdatalayerfunctionssetdatalayernamemd"></a>


***


## setDataLayerName()

> **setDataLayerName**(`name`): `void`

### Parameters

| Parameter | Type |
| ------ | ------ |
| `name` | `string` |

### Returns

`void`


<a name="namespacesdatalayertype-aliasesdatalayerentrymd"></a>


***


## DataLayerEntry

> **DataLayerEntry** = `Record`\<`string`, `AnyData`\>


<a name="namespacesdownloadandoutlinkreadmemd"></a>


***


## DownloadAndOutlink


- [addDownloadClasses](#namespacesdownloadandoutlinkfunctionsadddownloadclassesmd)
- [addDownloadExtensions](#namespacesdownloadandoutlinkfunctionsadddownloadextensionsmd)
- [enableLinkTracking](#namespacesdownloadandoutlinkfunctionsenablelinktrackingmd)
- [getDownloadClasses](#namespacesdownloadandoutlinkfunctionsgetdownloadclassesmd)
- [getLinkTrackingTimer](#namespacesdownloadandoutlinkfunctionsgetlinktrackingtimermd)
- [removeDownloadClasses](#namespacesdownloadandoutlinkfunctionsremovedownloadclassesmd)
- [removeDownloadExtensions](#namespacesdownloadandoutlinkfunctionsremovedownloadextensionsmd)
- [setDownloadClasses](#namespacesdownloadandoutlinkfunctionssetdownloadclassesmd)
- [setDownloadExtensions](#namespacesdownloadandoutlinkfunctionssetdownloadextensionsmd)
- [setIgnoreClasses](#namespacesdownloadandoutlinkfunctionssetignoreclassesmd)
- [setLinkClasses](#namespacesdownloadandoutlinkfunctionssetlinkclassesmd)
- [setLinkTrackingTimer](#namespacesdownloadandoutlinkfunctionssetlinktrackingtimermd)
- [trackLink](#namespacesdownloadandoutlinkfunctionstracklinkmd)


<a name="namespacesdownloadandoutlinkfunctionsadddownloadclassesmd"></a>


***


## addDownloadClasses()

> **addDownloadClasses**(`classes`): `void`

Adds new classes to the download classes list

### Parameters

| Parameter | Type |
| ------ | ------ |
| `classes` | `string`[] |

### Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionsadddownloadextensionsmd"></a>


***


## addDownloadExtensions()

> **addDownloadExtensions**(`extensions`): `void`

Adds new extensions to the download extensions list

### Parameters

| Parameter | Type |
| ------ | ------ |
| `extensions` | `string`[] |

### Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionsenablelinktrackingmd"></a>


***


## enableLinkTracking()

> **enableLinkTracking**(`trackAlsoMiddleAndRightClicks?`): `void`

Enables automatic link tracking. If called with `true`, left, right and
middle clicks on links will be treated as opening a link. Opening a links to
an external site (different domain) creates an outlink event. Opening a link
to a downloadable file creates a download event

### Parameters

| Parameter | Type |
| ------ | ------ |
| `trackAlsoMiddleAndRightClicks?` | `boolean` |

### Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionsgetdownloadclassesmd"></a>


***


## getDownloadClasses()

> **getDownloadClasses**(): `Promise`\<`string`[]\>

Returns list of download classes (CSS classes that indicate a link is a download)

### Returns

`Promise`\<`string`[]\>


<a name="namespacesdownloadandoutlinkfunctionsgetlinktrackingtimermd"></a>


***


## getLinkTrackingTimer()

> **getLinkTrackingTimer**(): `Promise`\<`number`\>

Returns lock/wait time after a request set by setLinkTrackingTimer

### Returns

`Promise`\<`number`\>


<a name="namespacesdownloadandoutlinkfunctionsremovedownloadclassesmd"></a>


***


## removeDownloadClasses()

> **removeDownloadClasses**(`classes`): `void`

Removes classes from the download classes list

### Parameters

| Parameter | Type |
| ------ | ------ |
| `classes` | `string`[] |

### Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionsremovedownloadextensionsmd"></a>


***


## removeDownloadExtensions()

> **removeDownloadExtensions**(`extensions`): `void`

Removes extensions from the download extensions list

### Parameters

| Parameter | Type |
| ------ | ------ |
| `extensions` | `string`[] |

### Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionssetdownloadclassesmd"></a>


***


## setDownloadClasses()

> **setDownloadClasses**(`classes`): `void`

Sets a list of class names that indicate whether a list is a download and not an outlink

### Parameters

| Parameter | Type |
| ------ | ------ |
| `classes` | `string`[] |

### Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionssetdownloadextensionsmd"></a>


***


## setDownloadExtensions()

> **setDownloadExtensions**(`extensions`): `void`

Overwrites the list of file extensions indicating that a link is a download

### Parameters

| Parameter | Type |
| ------ | ------ |
| `extensions` | `string`[] |

### Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionssetignoreclassesmd"></a>


***


## setIgnoreClasses()

> **setIgnoreClasses**(`classes`): `void`

Set a list of class names that indicate a link should not be tracked

### Parameters

| Parameter | Type |
| ------ | ------ |
| `classes` | `string`[] |

### Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionssetlinkclassesmd"></a>


***


## setLinkClasses()

> **setLinkClasses**(`classes`): `void`

Sets a list of class names that indicate whether a link is an outlink and not download

### Parameters

| Parameter | Type |
| ------ | ------ |
| `classes` | `string`[] |

### Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionssetlinktrackingtimermd"></a>


***


## setLinkTrackingTimer()

> **setLinkTrackingTimer**(`time`): `void`

When a visitor produces an events and closes the page immediately afterwards,
e.g. when opening a link, the request might get cancelled. To avoid loosing
the last event this way, JavaScript Tracking Client will lock the page for a
fraction of a second (if wait time hasn’t passed), giving the request time to
reach the Collecting & Processing Pipeline

### Parameters

| Parameter | Type |
| ------ | ------ |
| `time` | `number` |

### Returns

`void`


<a name="namespacesdownloadandoutlinkfunctionstracklinkmd"></a>


***


## trackLink()

> **trackLink**(`url`, `linkType`, `dimensions?`, `callback?`): `void`

Manually tracks outlink or download event with provided values

### Parameters

| Parameter | Type |
| ------ | ------ |
| `url` | `string` |
| `linkType` | `string` |
| `dimensions?` | [`Dimensions`](#type-aliasesdimensionsmd) |
| `callback?` | () => `void` |

### Returns

`void`


<a name="namespaceserrortrackingreadmemd"></a>


***


## ErrorTracking


- [enableJSErrorTracking](#namespaceserrortrackingfunctionsenablejserrortrackingmd)
- [trackError](#namespaceserrortrackingfunctionstrackerrormd)


<a name="namespaceserrortrackingfunctionsenablejserrortrackingmd"></a>


***


## enableJSErrorTracking()

> **enableJSErrorTracking**(`unique?`): `void`

Enables tracking of unhandled JavaScript errors.

### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `unique?` | `boolean` | track only unique errors |

### Returns

`void`


<a name="namespaceserrortrackingfunctionstrackerrormd"></a>


***


## trackError()

> **trackError**(`error`): `void`

Attempts to send error tracking request using same format as native errors caught by enableJSErrorTracking().
Such error request will still follow rules set for tracker, so it will be sent only when JS error tracking is enabled
([enableJSErrorTracking](#namespaceserrortrackingfunctionsenablejserrortrackingmd) function was called before this attempt). It will also respect rules for tracking only unique errors.

### Parameters

| Parameter | Type |
| ------ | ------ |
| `error` | `Error` |

### Returns

`void`


<a name="namespacesgoalconversionsreadmemd"></a>


***


## GoalConversions


- [trackGoal](#namespacesgoalconversionsfunctionstrackgoalmd)


<a name="namespacesgoalconversionsfunctionstrackgoalmd"></a>


***


## trackGoal()

> **trackGoal**(`goalId`, `conversionValue`, `dimensions?`, `options?`): `void`

Tracks manual goal conversion

### Parameters

| Parameter | Type |
| ------ | ------ |
| `goalId` | `string` \| `number` |
| `conversionValue` | `number` |
| `dimensions?` | [`Dimensions`](#type-aliasesdimensionsmd) |
| `options?` | [`EcommerceOptions`](#type-aliasesecommerceoptionsmd) |

### Returns

`void`


<a name="namespacesheartbeatreadmemd"></a>


***


## Heartbeat


- [disableHeartBeatTimer](#namespacesheartbeatfunctionsdisableheartbeattimermd)
- [enableHeartBeatTimer](#namespacesheartbeatfunctionsenableheartbeattimermd)


<a name="namespacesheartbeatfunctionsdisableheartbeattimermd"></a>


***


## disableHeartBeatTimer()

> **disableHeartBeatTimer**(): `void`

Disables sending heartbeats if they were previously enabled by "enableHeartBeatTimer" function.

### Returns

`void`


<a name="namespacesheartbeatfunctionsenableheartbeattimermd"></a>


***


## enableHeartBeatTimer()

> **enableHeartBeatTimer**(`delays?`): `void`

When a visitor is not producing any events (e.g. because they are reading an article or watching a video), we don’t know if they are still on the page. This might skew page statistics, e.g. time on page value. Heartbeat timer allows us to determine how much time visitors spend on a page by sending heartbeats to the Tracker as long as the page is in focus.

### Parameters

| Parameter | Type |
| ------ | ------ |
| `delays?` | `number`[] |

### Returns

`void`


<a name="namespacesmiscellaneousreadmemd"></a>


***


## Miscellaneous


- [setTrackingSourceProvider](#namespacesmiscellaneousfunctionssettrackingsourceprovidermd)


<a name="namespacesmiscellaneousfunctionssettrackingsourceprovidermd"></a>


***


## setTrackingSourceProvider()

> **setTrackingSourceProvider**(`provider`, `version`): `void`

Adds metadata about used framework

### Parameters

| Parameter | Type |
| ------ | ------ |
| `provider` | `string` |
| `version` | `string` |

### Returns

`void`


<a name="namespacespageviewsreadmemd"></a>


***


## PageViews


- [trackPageView](#namespacespageviewsfunctionstrackpageviewmd)


<a name="namespacespageviewsfunctionstrackpageviewmd"></a>


***


## trackPageView()

> **trackPageView**(`customPageTitle?`): `void`

Tracks a visit on the page that the function was run on

### Parameters

| Parameter | Type |
| ------ | ------ |
| `customPageTitle?` | `string` |

### Returns

`void`


<a name="namespacessitesearchreadmemd"></a>


***


## SiteSearch


- [trackSiteSearch](#namespacessitesearchfunctionstracksitesearchmd)


<a name="namespacessitesearchfunctionstracksitesearchmd"></a>


***


## trackSiteSearch()

> **trackSiteSearch**(`keyword`, `category?`, `searchCount?`, `dimensions?`): `void`

Tracks search requests on a website

### Parameters

| Parameter | Type |
| ------ | ------ |
| `keyword` | `string` |
| `category?` | `string` |
| `searchCount?` | `number` |
| `dimensions?` | [`Dimensions`](#type-aliasesdimensionsmd) |

### Returns

`void`


<a name="namespacesusermanagementreadmemd"></a>


***


## UserManagement


- [deanonymizeUser](#namespacesusermanagementfunctionsdeanonymizeusermd)
- [getUserId](#namespacesusermanagementfunctionsgetuseridmd)
- [getVisitorId](#namespacesusermanagementfunctionsgetvisitoridmd)
- [getVisitorInfo](#namespacesusermanagementfunctionsgetvisitorinfomd)
- [resetUserId](#namespacesusermanagementfunctionsresetuseridmd)
- [setUserId](#namespacesusermanagementfunctionssetuseridmd)
- [setUserIsAnonymous](#namespacesusermanagementfunctionssetuserisanonymousmd)


<a name="namespacesusermanagementfunctionsdeanonymizeusermd"></a>


***


## deanonymizeUser()

> **deanonymizeUser**(): `void`

Disables anonymous tracking and sends deanonymization event to the Tracker. Recommended method for disabling anonymous tracking.

### Returns

`void`


<a name="namespacesusermanagementfunctionsgetuseridmd"></a>


***


## getUserId()

> **getUserId**(): `Promise`\<`string`\>

The function that will return user ID

### Returns

`Promise`\<`string`\>


<a name="namespacesusermanagementfunctionsgetvisitoridmd"></a>


***


## getVisitorId()

> **getVisitorId**(): `Promise`\<`string`\>

Returns 16-character hex ID of the visitor

### Returns

`Promise`\<`string`\>


<a name="namespacesusermanagementfunctionsgetvisitorinfomd"></a>


***


## getVisitorInfo()

> **getVisitorInfo**(): `Promise`\<[`VisitorInfo`](#type-aliasesvisitorinfomd)\>

Returns visitor information in an array

### Returns

`Promise`\<[`VisitorInfo`](#type-aliasesvisitorinfomd)\>


<a name="namespacesusermanagementfunctionsresetuseridmd"></a>


***


## resetUserId()

> **resetUserId**(): `void`

Clears previously set userID, e.g. when visitor logs out

### Returns

`void`


<a name="namespacesusermanagementfunctionssetuseridmd"></a>


***


## setUserId()

> **setUserId**(`userId`): `void`

User ID is an additional parameter that allows you to aggregate data. When
set up, you will be able to search through sessions by this parameter, filter
reports through it or create Multi attribution reports using User ID

### Parameters

| Parameter | Type |
| ------ | ------ |
| `userId` | `string` |

### Returns

`void`


<a name="namespacesusermanagementfunctionssetuserisanonymousmd"></a>


***


## setUserIsAnonymous()

> **setUserIsAnonymous**(`isAnonymous`): `void`

Enables or disables anonymous tracking (anonymous = without consent). The next emitted event will have anonymous mode set accordingly.

### Parameters

| Parameter | Type |
| ------ | ------ |
| `isAnonymous` | `boolean` |

### Returns

`void`


<a name="namespacesecommercereadmemd"></a>


***


## eCommerce


- [~~addEcommerceItem~~](#namespacesecommercefunctionsaddecommerceitemmd)
- [~~clearEcommerceCart~~](#namespacesecommercefunctionsclearecommercecartmd)
- [ecommerceAddToCart](#namespacesecommercefunctionsecommerceaddtocartmd)
- [ecommerceCartUpdate](#namespacesecommercefunctionsecommercecartupdatemd)
- [ecommerceOrder](#namespacesecommercefunctionsecommerceordermd)
- [ecommerceProductDetailView](#namespacesecommercefunctionsecommerceproductdetailviewmd)
- [ecommerceRemoveFromCart](#namespacesecommercefunctionsecommerceremovefromcartmd)
- [~~getEcommerceItems~~](#namespacesecommercefunctionsgetecommerceitemsmd)
- [~~removeEcommerceItem~~](#namespacesecommercefunctionsremoveecommerceitemmd)
- [~~setEcommerceView~~](#namespacesecommercefunctionssetecommerceviewmd)
- [~~trackEcommerceCartUpdate~~](#namespacesecommercefunctionstrackecommercecartupdatemd)
- [~~trackEcommerceOrder~~](#namespacesecommercefunctionstrackecommerceordermd)


<a name="namespacesecommercefunctionsaddecommerceitemmd"></a>


***


## ~~addEcommerceItem()~~

> **addEcommerceItem**(`productSKU`, `productName`, `productCategory`, `productPrice`, `productQuantity`): `void`

### Parameters

| Parameter | Type |
| ------ | ------ |
| `productSKU` | `string` |
| `productName` | `string` |
| `productCategory` | `string` \| `string`[] |
| `productPrice` | `number` |
| `productQuantity` | `number` |

### Returns

`void`

### Deprecated

Please use the ecommerceAddToCart instead.


<a name="namespacesecommercefunctionsclearecommercecartmd"></a>


***


## ~~clearEcommerceCart()~~

> **clearEcommerceCart**(): `void`

### Returns

`void`

### Deprecated


<a name="namespacesecommercefunctionsecommerceaddtocartmd"></a>


***


## ecommerceAddToCart()

> **ecommerceAddToCart**(`products`, `options?`): `void`

Tracks action of adding products to a cart

### Parameters

| Parameter | Type |
| ------ | ------ |
| `products` | [`Product`](#type-aliasesproductmd)[] |
| `options?` | [`EcommerceOptions`](#type-aliasesecommerceoptionsmd) |

### Returns

`void`


<a name="namespacesecommercefunctionsecommercecartupdatemd"></a>


***


## ecommerceCartUpdate()

> **ecommerceCartUpdate**(`products`, `grandTotal`, `options?`): `void`

Tracks current state of a cart

### Parameters

| Parameter | Type |
| ------ | ------ |
| `products` | [`Product`](#type-aliasesproductmd)[] |
| `grandTotal` | `string` \| `number` |
| `options?` | [`EcommerceOptions`](#type-aliasesecommerceoptionsmd) |

### Returns

`void`


<a name="namespacesecommercefunctionsecommerceordermd"></a>


***


## ecommerceOrder()

> **ecommerceOrder**(`products`, `paymentInformation`, `options?`): `void`

Tracks conversion, including products and payment details

### Parameters

| Parameter | Type |
| ------ | ------ |
| `products` | [`Product`](#type-aliasesproductmd)[] |
| `paymentInformation` | [`PaymentInformation`](#type-aliasespaymentinformationmd) |
| `options?` | [`EcommerceOptions`](#type-aliasesecommerceoptionsmd) |

### Returns

`void`


<a name="namespacesecommercefunctionsecommerceproductdetailviewmd"></a>


***


## ecommerceProductDetailView()

> **ecommerceProductDetailView**(`products`, `options?`): `void`

Tracks action of viewing product page

### Parameters

| Parameter | Type |
| ------ | ------ |
| `products` | [`Product`](#type-aliasesproductmd)[] |
| `options?` | [`EcommerceOptions`](#type-aliasesecommerceoptionsmd) |

### Returns

`void`


<a name="namespacesecommercefunctionsecommerceremovefromcartmd"></a>


***


## ecommerceRemoveFromCart()

> **ecommerceRemoveFromCart**(`products`, `options?`): `void`

Tracks action of removing a products from a cart

### Parameters

| Parameter | Type |
| ------ | ------ |
| `products` | [`Product`](#type-aliasesproductmd)[] |
| `options?` | [`EcommerceOptions`](#type-aliasesecommerceoptionsmd) |

### Returns

`void`


<a name="namespacesecommercefunctionsgetecommerceitemsmd"></a>


***


## ~~getEcommerceItems()~~

> **getEcommerceItems**(): `Promise`\<`object`\>

### Returns

`Promise`\<`object`\>

### Deprecated


<a name="namespacesecommercefunctionsremoveecommerceitemmd"></a>


***


## ~~removeEcommerceItem()~~

> **removeEcommerceItem**(`productSKU`): `void`

### Parameters

| Parameter | Type |
| ------ | ------ |
| `productSKU` | `string` |

### Returns

`void`

### Deprecated

Please use the ecommerceRemoveFromCart instead.


<a name="namespacesecommercefunctionssetecommerceviewmd"></a>


***


## ~~setEcommerceView()~~

> **setEcommerceView**(`productSKU`, `productName?`, `productCategory?`, `productPrice?`): `void`

### Parameters

| Parameter | Type |
| ------ | ------ |
| `productSKU` | `string` |
| `productName?` | `string` |
| `productCategory?` | `string`[] |
| `productPrice?` | `string` |

### Returns

`void`

### Deprecated


<a name="namespacesecommercefunctionstrackecommercecartupdatemd"></a>


***


## ~~trackEcommerceCartUpdate()~~

> **trackEcommerceCartUpdate**(`cartAmount`): `void`

### Parameters

| Parameter | Type |
| ------ | ------ |
| `cartAmount` | `number` |

### Returns

`void`

### Deprecated

Please use the ecommerceCartUpdate instead.


<a name="namespacesecommercefunctionstrackecommerceordermd"></a>


***


## ~~trackEcommerceOrder()~~

> **trackEcommerceOrder**(`orderId`, `orderGrandTotal`, `orderSubTotal?`, `orderTax?`, `orderShipping?`, `orderDiscount?`): `void`

### Parameters

| Parameter | Type |
| ------ | ------ |
| `orderId` | `string` |
| `orderGrandTotal` | `number` |
| `orderSubTotal?` | `number` |
| `orderTax?` | `number` |
| `orderShipping?` | `number` |
| `orderDiscount?` | `number` |

### Returns

`void`

### Deprecated

Please use the ecommerceOrder instead.


<a name="type-aliasesdimensionsmd"></a>


***


## Dimensions

> **Dimensions** = `Record`\<`` `dimension${number}` ``, `string`\>


<a name="type-aliasesecommerceoptionsmd"></a>


***


## EcommerceOptions

> **EcommerceOptions** = `object`

### Properties

#### currencyCode?

> `optional` **currencyCode?**: `string`

Currency code in [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format. If not provided, the currency set in app settings will be used instead.


<a name="type-aliasesgetinitscriptmd"></a>


***


## GetInitScript

> **GetInitScript** = (`params`) => `string`

### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | `GetInitScriptParams` |

### Returns

`string`


<a name="type-aliasesinitoptionsmd"></a>


***


## InitOptions

> **InitOptions** = `object`

### Properties

#### dataLayerName?

> `optional` **dataLayerName?**: `string`

Defaults to 'dataLayer'


#### nonce?

> `optional` **nonce?**: `string`


<a name="type-aliasesinitializemd"></a>


***


## Initialize

> **Initialize** = (`containerId`, `containerUrl`, `nonceOrOptions?`) => `void`

### Parameters

| Parameter | Type |
| ------ | ------ |
| `containerId` | `string` |
| `containerUrl` | `string` |
| `nonceOrOptions?` | `string` \| [`InitOptions`](#type-aliasesinitoptionsmd) |

### Returns

`void`


<a name="type-aliasespaymentinformationmd"></a>


***


## PaymentInformation

> **PaymentInformation** = `object`

### Properties

#### discount?

> `optional` **discount?**: `number` \| `string`


#### grandTotal

> **grandTotal**: `number` \| `string`


#### orderId

> **orderId**: `string`


#### shipping?

> `optional` **shipping?**: `number` \| `string`


#### subTotal?

> `optional` **subTotal?**: `number` \| `string`


#### tax?

> `optional` **tax?**: `number` \| `string`


<a name="type-aliasesproductmd"></a>


***


## Product

> **Product** = `object`

### Properties

#### brand?

> `optional` **brand?**: `string`


#### category?

> `optional` **category?**: `LimitedArrayFiveStrings`


#### customDimensions?

> `optional` **customDimensions?**: `Record`\<`number`, `string`\>


#### name?

> `optional` **name?**: `string`


#### price?

> `optional` **price?**: `number`


#### quantity?

> `optional` **quantity?**: `number`


#### sku

> **sku**: `string`


#### variant?

> `optional` **variant?**: `string`


<a name="type-aliasesvisitorinfomd"></a>


***


## VisitorInfo

> **VisitorInfo** = \[`"0"` \| `"1"`, `string`, `number`, `string` \| `number`, `number`, `number` \| `""`, `number` \| `""`\]


<a name="variablesdefaultmd"></a>


***


## default

> `const` **default**: `object`

### Type Declaration

#### getInitScript

> **getInitScript**: [`GetInitScript`](#type-aliasesgetinitscriptmd)

#### initialize

> **initialize**: [`Initialize`](#type-aliasesinitializemd)


<a name="srcreadmemd"></a>


***


## Module: src

### Type Aliases

- [PiwikProProviderProps](#srctype-aliasespiwikproproviderpropsmd)

### Variables

- [default](#srcvariablesdefaultmd)


- [usePiwikPro](#srcfunctionsusepiwikpromd)


<a name="srcfunctionsusepiwikpromd"></a>


***


## usePiwikPro()

> **usePiwikPro**(): [`@piwikpro/react-piwik-pro`](#readmemd)

### Returns

[`@piwikpro/react-piwik-pro`](#readmemd)


<a name="srctype-aliasespiwikproproviderpropsmd"></a>


***


## PiwikProProviderProps

> **PiwikProProviderProps** = `object` & [`InitOptions`](#type-aliasesinitoptionsmd)

### Type Declaration

#### children

> **children**: `ReactNode`

#### containerId

> **containerId**: `string`

#### containerUrl

> **containerUrl**: `string`


<a name="srcvariablesdefaultmd"></a>


***


## default

> `const` **default**: `React.FC`\<[`PiwikProProviderProps`](#srctype-aliasespiwikproproviderpropsmd)\>

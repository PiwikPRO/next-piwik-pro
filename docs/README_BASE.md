# Piwik PRO Library for Next.js

Dedicated Piwik PRO library that helps with implementing Piwik PRO Tag Manager and the Piwik PRO tracking client in
Next.js applications.

## Installation

To use this package in your project, run the following command.

### npm

```sh
npm install @piwikpro/next-piwik-pro
```

### Yarn

```sh
yarn add @piwikpro/next-piwik-pro
```

### Basic setup

In your Next.js Project, include the default `PiwikProProvider` in the `layout.tsx` file. To set up the Piwik PRO Tag
Manager container in the app.

In the arguments, pass your container id and your container url as parameters (marked `container-id` and `container-url`
in the example below).

#### layout.tsx

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

### Setup with pages router

In the `next.config.js` use `transpilePackages` option.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@piwikpro/next-piwik-pro']
}

module.exports = nextConfig
```

### Setup with environmental variables

If you plan to use environmental variables to config your Piwik account you can do it with adding them to your `.env`
file. Remember that variables to be visible in component need to be named with `NEXT_PUBLIC_` prefix, in other cases
they will be visible only in Node context but not in Next.

#### .env

```sh
NEXT_PUBLIC_CONTAINER_ID=0a0b8661-8c10-4d59-e8fg-1h926ijkl184
NEXT_PUBLIC_CONTAINER_URL=https://example.piwik.pro
```

#### layout.tsx

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

### Setup with nonce

The nonce attribute is useful to allow-list specific elements, such as a particular inline script or style elements. It
can help you to avoid using the CSP unsafe-inline directive, which would allow-list all inline scripts or styles.

If you want your nonce to be passed to the script, pass it as the third argument when calling the script initialization
method.

#### layout.tsx

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

## Usage

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

### useEffect

```tsx
useEffect(() => {
  PageViews.trackPageView('optional title')
}, [])
```

### onClick

```tsx
<button
  onClick={() => {
    CustomEvent.trackEvent('Post', pageData.title)
  }}
>
  CustomEvent.trackEvent button
</button>
```
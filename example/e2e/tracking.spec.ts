import { test, expect, type Page } from '@playwright/test'

declare global {
  interface Window {
    _paq?: unknown[][]
  }
}

const getPaq = (page: Page) => page.evaluate(() => window._paq ?? [])

const waitForTracking = (page: Page) =>
  page.waitForFunction(() => (window._paq?.length ?? 0) > 0)

test('on app load, the provider initializes tracking and tags _paq with the "nextjs" source provider', async ({
  page
}) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await waitForTracking(page)

  expect(await getPaq(page)).toContainEqual(
    expect.arrayContaining(['setTrackingSourceProvider', 'nextjs'])
  )
})

test('using a tracking service from usePiwikPro pushes a "trackEvent" command to _paq', async ({
  page
}) => {
  await page.goto('/CustomEvent', { waitUntil: 'domcontentloaded' })
  await waitForTracking(page)

  const before = (await getPaq(page)).length
  await page.getByRole('button', { name: 'CustomEvent.trackEvent' }).click()
  await page.waitForFunction(
    (n) => (window._paq?.length ?? 0) > n,
    before
  )

  expect(await getPaq(page)).toContainEqual(
    expect.arrayContaining(['trackEvent', 'Button'])
  )
})

import { isValidUrl } from './isValidUrl'
import { describe, expect, test } from '@jest/globals'

describe('IsValidUrl method test', () => {
  test('correct http address returns the truth', () => {
    const test = 'https://example.com'
    expect(isValidUrl(test)).toBeTruthy()
  })

  test('correct https address returns the truth', () => {
    const test = 'https://example.com'
    expect(isValidUrl(test)).toBeTruthy()
  })

  test('address with subdomains returns the truth', () => {
    const test = 'http://en.wikipedia.org/wiki/Procter_&_Gamble'
    expect(isValidUrl(test)).toBeTruthy()
  })

  test('address with parameters returns the truth', () => {
    const test =
      'http://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&docid=nIv5rk2GyP3hXM&tbnid=isiOkMe3nCtexM:&ved=0CAUQjRw&url=http%3A%2F%2Fanimalcrossing.wikia.com%2Fwiki%2FLion&ei=ygZXU_2fGKbMsQTf4YLgAQ&bvm=bv.65177938,d.aWc&psig=AFQjCNEpBfKnal9kU7Zu4n7RnEt2nerN4g&ust=1398298682009707'
    expect(isValidUrl(test)).toBeTruthy()
  })

  test('incorrect address returns the false', () => {
    const test = 'https://sdfasd'
    expect(isValidUrl(test)).toBeFalsy()
  })

  test('incorrect address returns the false', () => {
    const test = 'dfdsfdsfdfdsfsdfs'
    expect(isValidUrl(test)).toBeFalsy()
  })

  test('incorrect address returns the false', () => {
    const test = 'magnet:?xt=urn:btih:123'
    expect(isValidUrl(test)).toBeFalsy()
  })

  test('incorrect address returns the false', () => {
    const test = 'https://w'
    expect(isValidUrl(test)).toBeFalsy()
  })

  test('incorrect address returns the false', () => {
    const test = 'https://sdfasdp.ppppppppppp'
    expect(isValidUrl(test)).toBeFalsy()
  })
})

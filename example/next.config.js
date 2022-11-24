/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@piwikpro/next-piwik-pro'])

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
}

module.exports = withTM(nextConfig)

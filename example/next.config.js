const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The library is consumed via `file:..`, so the app's files live under the
  // parent repo. Pin the tracing root there to silence the multiple-lockfiles
  // warning and let module resolution reach the linked package.
  outputFileTracingRoot: path.join(__dirname, '..')
}

module.exports = nextConfig

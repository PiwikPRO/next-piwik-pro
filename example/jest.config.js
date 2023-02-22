const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './'
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom'
}

module.exports = async () => {
  const jestConfig = await createJestConfig(customJestConfig)()
  jestConfig.transformIgnorePatterns.push('/node_modules/(?!@piwikpro/)')
  return jestConfig
}

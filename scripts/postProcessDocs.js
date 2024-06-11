import { readFileSync, writeFileSync } from 'node:fs'

const README = 'README.md'

const file = readFileSync(README, 'utf-8')

const formattedOutput = file
  .split('\n')
  // remove additional headings
  .filter(
    (line) =>
      !line.includes('# @piwikpro/next-piwik-pro') &&
      !line.includes('@piwikpro/next-piwik-pro / [Modules](#modulesmd)') &&
      !line.includes('[@piwikpro/next-piwik-pro](#readmemd)')
  )
  // remove links suited for multi page documentation
  .filter((line) => !line.includes('Exports'))
  // remove duplicated header
  .filter((line) => !line.includes('### Functions'))
  // remove remove additional prefix
  .filter((line) => !line.includes('node\\_modules'))
  .map((line) => line.replace('Namespace: ', ''))
  // increase heading level for the title
  .map((line) =>
    line.replace(
      '## Piwik PRO Library for Next.js',
      '# Piwik PRO Library for Next.js'
    )
  )
  .join('\n')
  // NOTE: top level table of contents is placed at the bottom for some reason
  // and needs to be manually (for now) placed at the top 
  .replace(`### Table of contents

#### Modules

- [src](#modulessrcmd)
`,"")

writeFileSync(README, formattedOutput)

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

writeFileSync(README, tableOfContentsFixup(formattedOutput))

/**
 * @description It is not clear why table of contents is not generated on top of
 * the generated docs. This function moves TOC from bottom of the file to the
 * top of the generated output
 * @param {string} readme
 */
function tableOfContentsFixup(readme) {
  const start =
    '<a name="modulesnode_modules__piwikpro_react_piwik_pro_distmd"></a>'
  const stop = '<a name="modulessrcmd"></a>'

  /** @type string[] */
  const TOC = []
  const lines = readme.split('\n')

  for (const line of lines) {
    if (line === start || TOC.length > 0) {
      if (line === stop) {
        break
      }
      TOC.push(line)
    }
  }
  const TOCString = TOC.join('\n')

  return readme.replace(
    `### Table of contents

#### Modules

- [src](#modulessrcmd)
`,
    TOCString
  )
}

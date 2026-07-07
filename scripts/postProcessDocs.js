import { readFileSync, writeFileSync } from 'node:fs'

const README = 'README.md'

const file = readFileSync(README, 'utf-8')

// concat-md joins the two entry points alphabetically: the re-exported
// react-piwik-pro module (with the main table of contents) first, then `src`.
const REACT_MODULE_PREFIX = 'node_modulesreact-piwik-prodist'

const formattedOutput = file
  .split('\n')
  // drop the auto-generated module index
  .filter((line) => !line.includes('## @piwikpro/next-piwik-pro'))
  .filter((line) => !line.includes('### Modules'))
  .filter(
    (line) =>
      !(
        line.startsWith('- [') &&
        (line.includes(`(#${REACT_MODULE_PREFIX}readmemd)`) ||
          line.includes('(#srcreadmemd)'))
      )
  )
  // drop the react module heading and its anchor (the anchor would clash
  // with the top readme one once prefixes are stripped)
  .filter(
    (line) =>
      !line.startsWith('## node\\_modules/@piwikpro/react-piwik-pro/dist')
  )
  .filter((line) => !line.includes(`<a name="${REACT_MODULE_PREFIX}readmemd">`))
  // remove duplicated header
  .filter((line) => !line.includes('### Functions'))
  // make the namespace list a table of contents
  .map((line) => line.replace('### Namespaces', '### Table of contents'))
  // concat-md decreased the title level, bring it back
  .map((line) =>
    line.replace(
      '## Piwik PRO Library for Next.js',
      '# Piwik PRO Library for Next.js'
    )
  )
  // strip the module prefix from anchors
  .map((line) => line.replaceAll(REACT_MODULE_PREFIX, ''))
  // usePiwikPro returns the whole module, show the package name
  // instead of the node_modules path
  .map((line) =>
    line.replaceAll(
      'node_modules/@piwikpro/react-piwik-pro/dist',
      '@piwikpro/react-piwik-pro'
    )
  )
  // nicer heading for this package's own exports
  .map((line) => (line.trim() === '## src' ? '## Module: src' : line))
  // keep separators only between sections, not between properties
  .filter((line) => line.trim() !== '***')
  // put a separator after every section anchor (the readme anchor
  // is followed by the title, skip it)
  .map((line) =>
    line.startsWith('<a name="') && !line.includes('name="readmemd"')
      ? `${line}\n\n\n***\n`
      : line
  )
  .join('\n')

writeFileSync(README, formattedOutput)

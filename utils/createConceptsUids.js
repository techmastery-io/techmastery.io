// This script loops through all .md files inside ./content and
// add an 'id' to the YAML front matter in case it's missing.
// It uses 'parse-md' and 'mustache' to make the process cleaner.

const fs = require('fs')
const parseMD = require('parse-md').default
const { nanoid } = require('nanoid')
const { render } = require('mustache')
const { getAllFiles } = require('utils')

const allConceptFiles = getAllFiles('./content')

const template = `---
{{#metadata}}
{{key}}: {{value}}
{{/metadata}}
---
{{&content}}`

// Main function
allConceptFiles.forEach((filePath) => {
  const data = fs.readFileSync(filePath, 'utf8')
  const parsed = parseMD(data)
  if (parsed.metadata.id) {
    // eslint-disable-next-line no-console
    console.log(`Concept already has an id property: ${filePath} `)
    return
  }
  parsed.metadata.id = nanoid()

  // Transform 'metadata' in a key/value pair to be able to match the mustache template
  parsed.metadata = Object.entries(parsed.metadata).map((entry) => ({
    key: entry[0],
    value: entry[1]
  }))

  // Use mustache to render the new data
  const newData = render(template, parsed)

  // Update the original file with the new data
  fs.writeFileSync(filePath, newData)
})

const fs = require('fs')
const { getAllFiles } = require('@/utils')

describe('Content files integrity', () => {
  const uniqueIdList = []
  test('all files have an id property', () => {
    const conceptFiles = getAllFiles('./content')
    const parseMD = require('parse-md').default
    conceptFiles.forEach((file) => {
      const fileContent = fs.readFileSync(file, 'utf8')
      const { metadata } = parseMD(fileContent)
      if (!metadata.id) {
        console.error(`File hasn't got an id set:  ${file}`)
      } else {
        uniqueIdList.push(metadata.id)
      }
    })
  })
  test('all ids are unique', () => {
    // find duplicate values in an array
    const duplicatedIds = uniqueIdList.reduce(
      (acc, currentValue, index, array) => {
        if (
          array.indexOf(currentValue) !== index &&
          !acc.includes(currentValue)
        )
          acc.push(currentValue)
        return acc
      },
      []
    )

    if (!duplicatedIds.length === 0) {
      console.log('Duplicate items are ' + duplicatedIds.join(','))
    }

    expect(duplicatedIds.length).toBe(0)
  })
})

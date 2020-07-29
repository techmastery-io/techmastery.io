const path = require('path')
const fs = require('fs')
const parseMD = require('parse-md').default
const axios = require('axios')

const getAllFiles = function(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
    } else {
      // Ignore files that are not .md
      if (!/\.md$/.test(file)) {
        return
      }
      arrayOfFiles.push(path.join(dirPath, '/', file))
    }
  })

  return arrayOfFiles
}

const allConceptFiles = getAllFiles('./content')
const allConceptIDs = []

// Get an array of all the Concept Id's in ./content
allConceptFiles.forEach((filePath) => {
  const data = fs.readFileSync(filePath, 'utf8')
  const parsed = parseMD(data)
  if (!parsed.metadata.id) {
    // eslint-disable-next-line no-console
    console.error(`Concept has no id property: ${filePath} `)
    return
  }
  allConceptIDs.push({ id: parsed.metadata.id, title: parsed.metadata.title })
})

// @todo Authenticate user/passwd
const login = { identifier: '', password: '' }
axios
  .post('http://localhost:1337/auth/local', login)
  .then((response) => {
    const token = response.data.jwt

    // Make a POST request to the backend
    axios
      .post('http://localhost:1337/concepts-bulk', allConceptIDs, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error.response.data))
  })
  .catch((error) => console.error(error.response.data))

// Make a POST request to the backend
// axios
//   .post('http://localhost:1337/concepts-bulk', allConceptIDs)
//   .then((response) => console.log(response.data))
//   .catch((error) => console.error(error.response.data))

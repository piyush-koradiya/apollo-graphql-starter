import * as path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import { importSchema } from 'graphql-import'

const typesArray = [
  ...fileLoader(path.join(__dirname, "./**/*.graphql"))
]

export default mergeTypes(typesArray, { all: true })

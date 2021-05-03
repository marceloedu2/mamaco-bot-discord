import { promises } from 'fs'

const getFileNames = async (directory, files) => {
  if (!files) files = []

  const fileList = await promises.readdir(directory)
  for (const k in fileList) {
    const stat = await promises.stat(directory + '/' + fileList[k])
    if (stat.isDirectory())
      await getFileNames(directory + '/' + fileList[k], files)
    else files.push(directory + '/' + fileList[k])
  }

  return files
}

export default getFileNames

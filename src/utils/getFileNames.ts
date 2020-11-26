import { promises } from 'fs'

const getFileNames = async (directory, files) => {
  if (!files) files = []

  let fileList = await promises.readdir(directory)
  for (let k in fileList) {
    let stat = await promises.stat(directory + '/' + fileList[k])
    if (stat.isDirectory())
      await getFileNames(directory + '/' + fileList[k], files)
    else files.push(directory + '/' + fileList[k])
  }

  return files
}

export default getFileNames

import fs from 'fs'
import path from 'path'

const postsDirectory = path.join(process.cwd(), 'pages/examples')

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return fileName.replace(/\.tsx$/, '')
  })
}

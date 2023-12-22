import { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [files, setFiles] = useState([])
  const [upFile, setUpFile] = useState<File>()

  async function getFiles() {
    const res = await axios.get('http://localhost:3000/')
    setFiles(res.data)
    console.log(res)
  }

  useEffect(() => {
   getFiles()
  }, [])

  function loadFile(e: ChangeEvent<HTMLInputElement>) {
    console.log('file up', e.target.files)
    if (!e.target.files?.[0]) return
    setUpFile(e.target.files[0])
  }

  function uploadFile() {
    if (!upFile) return
    const formData = new FormData()
    formData.append('file', upFile)
    axios.post('http://localhost:3000/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        console.log(res)
        getFiles()
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <input type="file" onInput={loadFile} />
      <button onClick={uploadFile}>upload</button>
      <div className="files">
        {files.map((file) => (
            <a href={'http://localhost:3000/' + file} key={file} target="_blank">{file}</a>
        ))}
      </div>
    </>
  )
}

export default App

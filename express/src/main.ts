const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
const multer  = require('multer')
const folder = '../drive/'
const upload = multer({ dest: folder })

app.use(cors())


console.log('listening...')
app.get('/', function (req: any, res: any) {
  fs.readdir(folder, (err: any, files: any) => {
    res.send(files)
  })
})

app.post('/upload', upload.single('file'), function (req: any, res: any, next: any) {
  console.log(req)
  res.send('success')
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})


app.listen(3000)

app.use(express.static('../drive'))


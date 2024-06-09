const express = require('express')
const app = express()
const port = 4001


app.get('/', (req, res) => {
  res.send('Hello SMIT!')
})

app.get('/about', (req, res) => {
    res.send('Hello Shajee! Nice to meet you!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
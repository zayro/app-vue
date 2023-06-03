const express = require('express')
const figlet = require('figlet')
const boxen = require('boxen')
const chalk = require('chalk')
const path = require('path')
const app = express()

console.log(chalk.yellow(figlet.textSync('FrontEnd - APP', { horizontalLayout: 'full' })))

console.log(
  boxen('bY: Marlon Zayro Arias Vargas <zayro8905@gmail.com>', {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    borderColor: 'yellow'
  })
)

app.use('/', express.static(path.join(__dirname, './dist')))

/*
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})
*/

const port = process.env.PORT || 3001
app.listen(port)

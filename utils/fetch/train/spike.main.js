const fs = require('fs')
const fetchTrain = require('./index')

const train$ = fetchTrain()

console.clear()
train$.subscribe((data) => fs.writeFileSync('./train.json', JSON.stringify(data)))

const fs = require('fs')
const { Observable } = require('rxjs')
const fetchBus = require('./utils/fetch/bus')
const formatBus = require('./utils/format/bus')

const bus$ = Observable.of(null)
  .concatMap(fetchBus)
  .concatMap(formatBus)

console.clear()
bus$.subscribe((d) => fs.writeFileSync('./bus.json', JSON.stringify(d)))

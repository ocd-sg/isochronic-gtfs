const { Observable } = require('rxjs')
const fetchBus = require('./utils/fetch/bus')
const formatBus = require('./utils/format/bus')
const fetchTrain = require('./')

const bus$ = Observable.of(null)
  .concatMap(fetchBus)
  .concatMap(formatBus)

const train$ = Observable.of(null)
  .concatMap(fetchTrain)

const main$ = Observable.forkJoin(
  // bus$
)

console.clear()
main$.subscribe()

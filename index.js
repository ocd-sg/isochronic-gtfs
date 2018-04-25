const { Observable } = require('rxjs')
const fetchBus = require('./utils/fetch/bus')
// const formatBus = require('./utils/format/bus')
const fetchTrain = require('./utils/fetch/train')

const bus$ = Observable.of(null)
  .concatMap(fetchBus)
  // .concatMap(formatBus)

const train$ = Observable.of(null)
  .concatMap(fetchTrain)

const main$ = Observable.forkJoin(
  bus$,
  train$
)

console.clear()
main$.subscribe()

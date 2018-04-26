const { Observable } = require('rxjs')
const fetchBus = require('./utils/fetch/bus')
const formatBus = require('./utils/format/bus')
const fetchTrain = require('./utils/fetch/train')

const formatTrain = (d) => d

const bus$ = Observable.of(null)
  .concatMap(fetchBus)
  .concatMap(formatBus)

const train$ = Observable.of(null)
  .concatMap(fetchTrain)
  .concatMap(formatTrain)

const main$ = Observable.of(bus$, train$)
  .concatMap((d$) => d$)
  .reduce((memo, d) => [ ...memo, d ], [])
  .map(([ bus, train ]) => ({ bus, train }))

console.clear()
main$.subscribe()

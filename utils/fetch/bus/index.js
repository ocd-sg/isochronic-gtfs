const fs = require('fs')
const path = require('path')
const { Observable } = require('rxjs')
const ora = require('ora')
const createLabel = require('./utils/createLabel')
const fetch = require('./utils/fetch')(
  fs.readFileSync('./config/mytransport.key').toString().trim()
)

const data = ['BusServices', 'BusStops', 'BusRoutes']
const timer$ = Observable.timer(0, 500)

const createStream = (resource) => {
  const label = createLabel(resource)
  const title = `fetch ${label}`
  const spinner = ora(`fetch ${label}`).start()

  const source$ = timer$
    .map((skip) => skip * 50)
    .concatMap(fetch(resource))
    .takeWhile((d) => d.length)
    .scan((memo, d) => [ ...memo, ...d ], [])
    .takeWhile((d) => d.length < 5000)

  const spinner$ = source$
    .do((d) => { spinner.text = `${title}: ${d.length}` })
    .finally(() => spinner.succeed())

  return spinner$
}

const fetch$ = Observable.from(data)
  .concatMap(createStream)
  .reduce((memo, d) => [ ...memo, d ], [])
  .map(([ services, stops, routes ]) => ({ services, stops, routes }))

module.exports = fetch$

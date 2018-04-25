const fs = require('fs')
const path = require('path')
const { Observable } = require('rxjs')
const ora = require('ora')
const createLabel = require('./utils/createLabel')
const fetch = require('./utils/fetch')(
  fs.readFileSync('./config/mytransport.key').toString().trim()
)

const RESOURCES = ['BusServices', 'BusStops', 'BusRoutes']
const INTERVAL = 500
const SKIP = 50

const createStream = (resource) => {
  const _fetch = fetch(resource)
  const label = createLabel(resource)
  const title = `fetch ${label}`
  const spinner = ora(`fetch ${label}`).start()

  const source$ = _fetch(0)
    .expand(({ skip }) => _fetch(skip + SKIP))
    .delay(INTERVAL)
    .takeWhile(({ data }) => data && data.length)
    .scan((memo, { data }) => [ ...memo, ...data ], [])
    .takeWhile((d) => d.length < 1000)

  const spinner$ = source$
    .do((d) => { spinner.text = `${title}: ${d.length}` })
    .finally(() => spinner.succeed())

  return spinner$
}

const fetch$ = Observable.from(RESOURCES)
  .concatMap(createStream)
  .reduce((memo, d) => [ ...memo, d ], [])
  .map(([ services, stops, routes ]) => ({ services, stops, routes }))

const fetchBus = () => fetch$

module.exports = fetchBus

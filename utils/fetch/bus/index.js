const fs = require('fs')
const { resolve } = require('path')
const { Observable } = require('rxjs')
const ora = require('ora')
const createLabel = require('./utils/createLabel')
const fetch = require('./utils/fetch')(
  fs.readFileSync(resolve(__dirname, '../../../config/mytransport.key'), 'utf8').trim()
)

const RESOURCES = ['BusServices', 'BusStops', 'BusRoutes']
const INTERVAL = 500
const SKIP = 500

const createStream = (resource) => {
  const _fetch = fetch(resource)
  const label = createLabel(resource)
  const title = `fetch ${label}`
  const spinner = ora(`fetch ${label}`).start()

  const source$ = _fetch(0)
    .expand(({ skip }) => _fetch(skip + SKIP))
    .delay(INTERVAL)
    .takeWhile(({ data }) => data && data.length)
    .reduce((memo, { data }) => [ ...memo, ...data ], [])
    .do((d) => { spinner.text = `${title}: ${d.length}` })
    .finally(() => spinner.succeed())

  return source$
}

const fetch$ = Observable.from(RESOURCES)
  .concatMap(createStream)
  .reduce((memo, d) => [ ...memo, d ], [])
  .map(([ services, stops, routes ]) => ({ services, stops, routes }))

const fetchBus = () => fetch$

module.exports = fetchBus

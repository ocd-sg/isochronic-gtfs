const fs = require('fs')
const { resolve } = require('path')
const { Observable } = require('rxjs')
const d3 = require('d3-dsv')
const fetchBus = require('./utils/fetch/bus')
const formatBus = require('./utils/format/bus')
const fetchTrain = require('./utils/fetch/train')
const formatTrain = require('./utils/format/train')
const formatRail = require('./utils/format/rail')

const bus$ = Observable.of(null)
  .concatMap(fetchBus)
  .concatMap(formatBus)

const train$ = Observable.of(null)
  .concatMap(fetchTrain)
  .concatMap(formatTrain)

const rail$ = Observable.of(null)
  .concatMap(formatRail)

const main$ = Observable.of(bus$, train$, rail$)
  .concatMap((d$) => d$)
  .reduce((memo, d) => [ ...memo, d ], [])
  .map((results) =>
    ['frequencies', 'routes', 'stop_times', 'stops', 'trips']
      .map((key) => ({
        key,
        value: results.reduce((memo, result) => [ ...memo, ...result[key] ], [])
      }))
      .reduce((memo, d) => ({ ...memo, [d.key]: d.value }), {})
  )
  .do(() => {
    if (!fs.existsSync(resolve(__dirname, 'output'))) fs.mkdirSync(resolve(__dirname, 'output'))
  })
  .do((gtfs) => {
    fs.copyFileSync(
      resolve(__dirname, 'static/agency.txt'),
      resolve(__dirname, 'output/agency.txt')
    )
    fs.copyFileSync(
      resolve(__dirname, 'static/calendar.txt'),
      resolve(__dirname, 'output/calendar.txt')
    )
    fs.writeFileSync(
      resolve(__dirname, 'output/frequencies.txt'),
      d3.csvFormat(gtfs['frequencies'])
    )
    fs.writeFileSync(
      resolve(__dirname, 'output/routes.txt'),
      d3.csvFormat(gtfs['routes'])
    )
    fs.writeFileSync(
      resolve(__dirname, 'output/stop_times.txt'),
      d3.csvFormat(gtfs['stop_times'])
    )
    fs.writeFileSync(
      resolve(__dirname, 'output/stops.txt'),
      d3.csvFormat(gtfs['stops'])
    )
    fs.writeFileSync(
      resolve(__dirname, 'output/trips.txt'),
      d3.csvFormat(gtfs['trips'])
    )
  })

console.clear()
main$.subscribe()

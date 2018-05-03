const { Observable } = require('rxjs')
const ora = require('ora')
const formatStops = require('./utils/formatStops')
const formatRoutes = require('./utils/formatRoutes')
const formatTrips = require('./utils/formatTrips')
const formatStopTimes = require('./utils/formatStopTimes')
const formatFrequencies = require('./utils/formatFrequencies')

const formatBus = ({ services, stops, routes }) => {
  const spinner = ora('format bus GTFS').start()

  const source$ = Observable.of({
      stops: formatStops(stops),
      routes: formatRoutes(routes),
      trips: formatTrips(services),
      'stop_times': formatStopTimes(stops)(routes),
      frequencies: formatFrequencies(services)
    })
    .delay(1000)

  const spinner$ = source$
    .finally(() => spinner.succeed())

  return spinner$
}

module.exports = formatBus

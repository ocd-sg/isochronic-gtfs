const { Observable } = require('rxjs')
const ora = require('ora')
const formatStops = require('./utils/formatStops')
const formatRoutes = require('./utils/formatRoutes')
const formatTrips = require('./utils/formatTrips')
const formatStopTimes = require('./utils/formatStopTimes')
const formatFrequencies = require('./utils/formatFrequencies')

const formatTrain = ({ services, stops, trips }) => {
  const spinner = ora('format train GTFS').start()

  const source$ = Observable.of({
      stops: formatStops(stops),
      routes: formatRoutes(services),
      trips: formatTrips(services),
      'stop_times': formatStopTimes(trips),
      frequencies: formatFrequencies(trips)
    })
    .delay(1000)

  const spinner$ = source$
    .finally(() => spinner.succeed())

  return spinner$
}

module.exports = formatTrain

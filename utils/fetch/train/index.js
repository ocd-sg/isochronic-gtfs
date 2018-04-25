const { Observable } = require('rxjs')
const fetchStops = require('./utils/fetchStops')
const fetchServices = require('./utils/fetchServices')
const fetchTrips = require('./utils/fetchTrips')

const fetch$ = Observable.from([
  fetchStops(),
  fetchServices(),
  fetchTrips()
])
  .concatMap((d$) => d$.last())
  .reduce((memo, d) => [ ...memo, d ], [])
  .map(([ stops, services, trips ]) => ({ stops, services, trips }))

module.exports = () => fetch$

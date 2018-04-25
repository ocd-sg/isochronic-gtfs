const fetchTrips = require('./utils/fetchTrips')

const times$ = fetchTrips()
times$.subscribe(console.log.bind(console))

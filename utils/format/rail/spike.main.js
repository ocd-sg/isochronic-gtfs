const formatRail = require('./index')

const rail$ = formatRail()

rail$.subscribe((d) => console.log(d.trips[0]))

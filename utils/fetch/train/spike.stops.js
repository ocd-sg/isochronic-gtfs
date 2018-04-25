const fetchStops = require('./utils/fetchStops')

const stops$ = fetchStops()
stops$.subscribe((d) => console.log(JSON.stringify(d, null, 2)))

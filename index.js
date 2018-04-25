const fetchBus$ = require('./utils/fetch/bus')

console.clear()
fetchBus$.subscribe(console.log.bind(console))

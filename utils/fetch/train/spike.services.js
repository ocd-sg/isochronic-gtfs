const fetchServices = require('./utils/fetchServices')

const services$ = fetchServices()
services$.subscribe((d) => console.log(JSON.stringify(d, null, 2)))

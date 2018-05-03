const ora = require('ora')
const fetchStops = require('./fetchStops')
const parseServices = require('./parseServices')
const lines = require('../data/lines')

const title = 'fetch train services'
const spinner = ora()

const stops$ = fetchStops()
const services$ = stops$
  .do(() => spinner.start())
  .do(() => { spinner.text = `title: parsing train services` })
  .map(parseServices(lines))
  .do((services) => { spinner.text = `${title}: ${services.length}` })
  .finally(() => spinner.succeed())

module.exports = () => services$

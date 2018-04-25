const { Observable } = require('rxjs')
const ora = require('ora')
const axios = require('axios')
const fetchServices = require('./fetchServices')
const parseTrips = require('./parseTrips')

const title = 'fetch train trips'
const spinner = ora()

const services$ = fetchServices()
const trips$ = services$
  .do(() => spinner.start())
  .do(() => { spinner.text = `${title}: prepare stop-terminal pairs` })
  .concatMap((services) => Observable.from(services))
  .map(({ id, directions }) =>
    directions
      .map((direction) =>
        direction.stops
          .map((stop, sequence) => ({
            id: `${id}:WD:${direction.direction}`,
            line: id,
            direction: direction.direction,
            stop,
            terminal: direction.stops[direction.stops.length - 1],
            sequence
          }))
      )
      .reduce((memo, d) => [ ...memo, ...d ], [])
  )
  .concatMap((trips) =>
    Observable.from(trips)
      .filter(({ stop, terminal }) => stop.id !== terminal.id)
      .do((trip) => { spinner.text = `${title}: fetching ${trip.id}, ${[trip.stop.id, trip.terminal.id].join('-')} ${[trip.stop.ref, trip.terminal.ref].join('-')}` })
      .concatMap((trip) =>
        Observable.fromPromise(
          axios({
            method: 'get',
            url: `https://www.mytransport.sg/content/mytransport/home/commuting/trainservices/jcr:content/par3/mrt_info.ajax.getTrainInformation.${trip.stop.id}.${trip.terminal.id}.${trip.line}.html`,
            responseType: 'text'
          })
          .then(({ data }) => data)
          .catch(() => spinner.warn(`${title}: error fetching ${trip.id}, ${[trip.stop.id, trip.terminal.id].join('-')} ${[trip.stop.ref, trip.terminal.ref].join('-')}`))
        )
        .map(parseTrips)
        .map((times) => ({ ...trip, times }))
      )
  )
  .reduce((memo, trip) => [ ...memo, trip ], [])
  .do(() => { spinner.text = title })
  .finally(() => spinner.succeed())

module.exports = () => trips$

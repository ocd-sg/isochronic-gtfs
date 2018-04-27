const _ = require('lodash')

const transform = ({
  id: trip_id,
  sequence: stop_sequence,
  stop,
  time
}) => ({
  trip_id,
  stop_sequence,
  stop_id: stop.id,
  arrival_time: time,
  departure_time: time,
  shape_dist_traveled: null
})

const _stringToMinutes = (str) => {
  const h = +str.slice(0, 2)
  const m = +str.slice(2, 4)
  return (h < 3 ? h + 24 : h) * 60 + m
}

const _minutesToComposite = (minutes) => {
  const h = ~~(minutes / 60)
  const m = minutes % 60
  const hStr = h < 10 ? `0${h}` : `${h}`
  const mStr = m < 10 ? `0${m}` : `${m}`
  return `${hStr}:${mStr}:00`
}

const formatTrainStopTimes = (_trips) => {
  const trips = _(_trips)
    .sortBy(({ sequence }) => sequence)
    .groupBy(({ id }) => id)
    .map((d) => d)
    .value()
  const flattened = trips
    .reduce((memo, d) => memo.concat(d), [])

  trips
    .forEach((trip) => {
      trip
        .forEach((segment, index) => {
          if (index === 0) {
            segment.delta = 0
            segment.time = segment.times.arrivals.find(({ type, day, terminal }) =>
              type === 'FIRST_TRAIN' && day === 'WEEKDAYS' && terminal === segment.terminal.name
            ).time
            segment.time = _stringToMinutes(segment.time)
          }
          else if (index < trip.length - 1) {
            const prev = trip[index - 1]
            const deltas = segment.times.arrivals
              .filter(({ type, day, terminal }) =>
                prev.times.arrivals.find((d) =>
                  d.type === type && d.day === day && d.terminal === terminal
                )
              )
              .map(({ type, day, terminal, time }) => {
                const prevTiming = prev.times.arrivals.find((d) =>
                  d.type === type && d.day === day && d.terminal === terminal
                )
                const currentTime = _stringToMinutes(time)
                const prevTime = _stringToMinutes(prevTiming.time)
                const delta = currentTime - prevTime
                return delta
              })

            segment.delta = deltas
              .filter((d) => d > 0)
              .sort()[0]
          }
        })
    })

  trips
    .forEach((trip) => {
      trip
        .forEach((segment) => {
          if (segment.delta === undefined) {
            const opposite = flattened.find(({ line, direction, sequence }) =>
              line === segment.line && direction !== segment.direction && sequence === 1
            )
            segment.delta = opposite.delta
          }
        })
    })

  trips
    .forEach((trip) => {
      trip
        .forEach((segment, index) => {
          if (index === 0)
            segment.time = segment.time
          else
            segment.time = trip[index - 1].time + segment.delta
        })
    })

  return flattened
    .map((d) => Object.assign({}, d, {
      time: _minutesToComposite(d.time)
    }))
    .map(transform)
}

module.exports = formatTrainStopTimes

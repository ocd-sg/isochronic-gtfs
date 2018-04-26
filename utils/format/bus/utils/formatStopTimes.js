const _ = require('lodash')

const format = ({
  CompositeKey: trip_id,
  CompositeTime: arrival_time,
  CompositeTime: departure_time,
  BusStopCode: stop_id,
  StopSequence: stop_sequence,
  Distance: shape_dist_traveled
}) => ({
  trip_id,
  arrival_time,
  departure_time,
  stop_id,
  stop_sequence,
  shape_dist_traveled
})

const _stringToMinutes = (str) => {
  if (!str || str === '-') return null
  const parts = [+str.slice(0, 2), +str.slice(2, 4)]
  const hours = parts[0] === 0
    ? 24
    ? parts[0] === 1
    : 25
    : parts[0]
  const minutes = hours * 60 + parts[1]
  return minutes
}

const _minutesToComposite = (_minutes) => {
  const hours = ~~(_minutes / 60)
  const minutes = _minutes % 60
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:00`
}

const formatStopTimes = (routes) =>
  routes
    .map((d) => Object.assign({}, d, {
      Direction: d.Direction === 1 ? 0 : 1,
    }))
    .filter(({ WD_FirstBus }) => WD_FirstBus !== '-')
    .map((d) => Object.assign({}, d, {
      CompositeKey: `${d.ServiceNo}:WD:${d.Direction}`
    }))
    .reduce((memo, d) => {
      const existing = memo.find(({ CompositeKey }) => CompositeKey === d.CompositeKey)
      if (existing) {
        if (!existing.value.find(({ StopSequence }) => StopSequence === d.StopSequence))
          existing.value.push(d)
        return memo
      }
      else
        return memo.concat({
          CompositeKey: d.CompositeKey,
          value: [d]
        })
    }, [])
    .filter(({ CompositeKey }) => !CompositeKey.match('-'))
    .map(({ CompositeKey, value }) => ({ CompositeKey, value: _.sortBy(value, ({ StopSequence }) => StopSequence) }))
    .map((service) => {
      const deltas = service.value
        .map((curr, index) => {
          let delta = 0
          if (index > 0) {
            const prev = service.value[index - 1]
            const prevTimes = [prev.WD_FirstBus, prev.WD_LastBus, prev.SAT_FirstBus, prev.SAT_LastBus, prev.SUN_FirstBus, prev.SUN_LastBus]
              .map(_stringToMinutes)
              .filter((d) => d)
            const currTimes = [curr.WD_FirstBus, curr.WD_LastBus, curr.SAT_FirstBus, curr.SAT_LastBus, curr.SUN_FirstBus, curr.SUN_LastBus]
              .map(_stringToMinutes)
              .filter((d) => d)
            const deltas = currTimes.map((currTime, index) => currTime - prevTimes[index])
            delta = deltas.find((d) => d >= 0)
            if (delta === undefined) {
              const distance = curr.Distance - prev.Distance
              delta = Math.round(distance * 2)
            }
          }
          return Object.assign({}, curr, {
            Delta: delta,
            Minutes: _stringToMinutes(curr.WD_FirstBus)
          })
        })
      const value = []
      let accumulator = 0
      deltas
        .forEach((curr, index) => {
          if (index === 0) {
            accumulator = curr.Minutes
          }
          else {
            const prev = deltas[index - 1]
            accumulator = accumulator + curr.Delta
          }
          value.push(Object.assign({}, curr, {
            CompositeTime: _minutesToComposite(accumulator)
          }))
        })
      return value
    })
    .reduce((memo, d) => memo.concat(d), [])
    .map(format)

module.exports = formatStopTimes

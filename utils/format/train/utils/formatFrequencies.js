const transform = ({
  id: trip_id,
  start: start_time,
  end: end_time,
  headway: headway_secs
}) => ({
  trip_id,
  start_time,
  end_time,
  headway_secs
})

const stringToMinutes = (str) => {
  const h = +str.slice(0, 2)
  const m = +str.slice(2, 4)
  return (h < 3 ? h + 24 : h) * 60 + m
}

const minutesToString = (minutes) => {
  const h = ~~(minutes / 60)
  const m = minutes % 60
  const hStr = h < 10 ? `0${h}` : `${h}`
  const mStr = m < 10 ? `0${m}` : `${m}`
  return `${hStr}:${mStr}:00`
}

const formatFrequencies = (trips) =>
  trips
    .filter(({ sequence }) => sequence === 0)
    .map((trip) => {
      const { terminal } = trip
      const first = stringToMinutes(trip.times.arrivals.find((d) => d.terminal === terminal.name && d.type === 'FIRST_TRAIN' && d.day === 'WEEKDAYS').time)
      const last = stringToMinutes(trip.times.arrivals.find((d) => d.terminal === terminal.name && d.type === 'LAST_TRAIN' && d.day === 'WEEKDAYS').time)
      const peaks = trip.times.peaks.filter(({ day }) => day === 'WEEKDAYS')
      const frequencies = trip.times.frequencies.filter(({ day }) => day === 'WEEKDAYS')

      let periods = []
      let i = first

      while (i < last) {
        const firstPeakTime = peaks.length ? stringToMinutes(peaks[0].time[0]) : 0
        if (i < firstPeakTime) {
          const peak = peaks.shift()
          periods.push({
            type: 'OFF-PEAK',
            start: i,
            end: stringToMinutes(peak.time[0])
          })
          periods.push({
            type: 'PEAK',
            start: stringToMinutes(peak.time[0]),
            end: stringToMinutes(peak.time[1])
          })
          i = stringToMinutes(peak.time[1])
        }
        else if (i >= firstPeakTime && firstPeakTime !== 0) {
          const peak = peaks.shift()
          periods.push({
            type: 'PEAK',
            start: stringToMinutes(peak.time[0]),
            end: stringToMinutes(peak.time[1])
          })
          i = stringToMinutes(peak.time[1])
        }


        if (peaks.length === 0) {
          periods.push({
            type: 'OFF-PEAK',
            start: i,
            end: last
          })
          i = last
        }
      }

      periods = periods
        .map(({ type, start, end }) => ({
          id: trip.id,
          start: minutesToString(start),
          end: minutesToString(end),
          headway: frequencies.find((d) => d.type === type).frequency * 60
        }))

      return periods
    })
    .reduce((memo, d) => [ ...memo, ...d ], [])
    .map(transform)

module.exports = formatFrequencies

const mappings = [
  ['CompositeKey', 'trip_id'],
  ['StartTime', 'start_time'],
  ['EndTime', 'end_time'],
  ['Headway', 'headway_secs'],
]

const format = ({
  CompositeKey: trip_id,
  StartTime: start_time,
  EndTime: end_time,
  Headway: headway_secs
}) => ({
  trip_id,
  start_time,
  end_time,
  headway_secs
})

const formatFrequencies = (services) =>
  services
    .map((d) => ({ ...d, Direction: d.Direction === 1 ? 0 : 1 }))
    .map((d) => ({ ...d, CompositeKey: `${d.ServiceNo}:WD:${d.Direction}` }))
    .map((d) => ({
      ...d,
      ...['AM_Peak_Freq', 'AM_Offpeak_Freq', 'PM_Peak_Freq', 'PM_Offpeak_Freq']
        .map((key) => [
          key,
          d[key].split('-').map((d) => +d)
        ])
        .reduce((memo, [key, value]) => Object.assign(memo, { [key]: value }), {})
    }))
    .map((d) => ({
      ...d,
      ...['AM_Peak_Freq', 'AM_Offpeak_Freq', 'PM_Peak_Freq', 'PM_Offpeak_Freq']
        .map((key) => [
          key,
          d[key].reduce((memo, d) => memo + d, 0) / d[key].length * 60,
        ])
        .reduce((memo, [key, value]) => Object.assign(memo, { [key]: value }), {})
    }))
    .map((d) =>
      [
        {
          CompositeKey: d.CompositeKey,
          StartTime: '05:00:00',
          EndTime: '06:30:00',
          Headway: d.AM_Offpeak_Freq
        },
        {
          CompositeKey: d.CompositeKey,
          StartTime: '06:30:00',
          EndTime: '08:30:00',
          Headway: d.AM_Peak_Freq
        },
        {
          CompositeKey: d.CompositeKey,
          StartTime: '08:30:00',
          EndTime: '17:00:00',
          Headway: d.AM_Offpeak_Freq
        },
        {
          CompositeKey: d.CompositeKey,
          StartTime: '17:00:00',
          EndTime: '19:00:00',
          Headway: d.PM_Peak_Freq
        },
        {
          CompositeKey: d.CompositeKey,
          StartTime: '19:00:00',
          EndTime: '25:00:00',
          Headway: d.PM_Offpeak_Freq
        }
      ]
      .filter(({ Headway }) => Headway !== 0)
    )
    .reduce((memo, d) => memo.concat(d), [])
    .map(format)

module.exports = formatFrequencies

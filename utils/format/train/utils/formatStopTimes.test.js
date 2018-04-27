const test = require('ava')
const formatStopTimes = require('./formatStopTimes')

const _data = require('./__tests__/train.json')

test('format: stop_times.txt', (t) => {
  const data = _data.trips
  const value = formatStopTimes(data)

  const ids = data.reduce((memo, d) => memo.includes(d.id) ? memo : [ ...memo, d.id ], [])

  // check length
  ids.forEach((id) =>
    t.is(
      value.filter(({ trip_id }) => trip_id === id).length,
      _data.trips.filter(({ id: _id }) => _id === id).length
    )
  )

  // check time sequencing
  ids.forEach((id) =>
    value
      .filter(({ trip_id }) => trip_id === id)
      .reduce((memo, d) => memo && memo.arrival_time < d.arrival_time ? d : false, { arrival_time: '' })
      ? t.pass()
      : t.fail(value.filter(({ trip_id }) => trip_id === id).map(({ arrival_time }) => arrival_time).join(', '))
  )
})

test.skip('format: stop_times.txt, non-weekdays', (t) => {
  const data = [
    {
      ServiceNo: '18',
      Operator: 'SBST',
      Direction: 1,
      StopSequence: 10,
      BusStopCode: '76079',
      Distance: 3.6,
      WD_FirstBus: '-',
      WD_LastBus: '-',
      SAT_FirstBus: '0531',
      SAT_LastBus: '0016',
      SUN_FirstBus: '0602',
      SUN_LastBus: '0016'
    },
    {
      ServiceNo: '18',
      Operator: 'SBST',
      Direction: 1,
      StopSequence: 11,
      BusStopCode: '75059',
      Distance: 4.3,
      WD_FirstBus: '-',
      WD_LastBus: '-',
      SAT_FirstBus: '0534',
      SAT_LastBus: '0019',
      SUN_FirstBus: '0605',
      SUN_LastBus: '0019'
    },
    {
      ServiceNo: '18',
      Operator: 'SBST',
      Direction: 1,
      StopSequence: 12,
      BusStopCode: '75069',
      Distance: 5,
      WD_FirstBus: '-',
      WD_LastBus: '-',
      SAT_FirstBus: '0535',
      SAT_LastBus: '0020',
      SUN_FirstBus: '0606',
      SUN_LastBus: '0020'
    }
  ]
  const expected = []
  const value = formatStopTimes(data)

  t.deepEqual(value, expected)
})

test.skip('validate: bus stop times, arrival > departure', (t) => {
  const data = [
    {
      ServiceNo: '176',
      Operator: 'SMRT',
      Direction: 2,
      StopSequence: 29,
      BusStopCode: '20251',
      Distance: 11.8,
      WD_FirstBus: '0619',
      WD_LastBus: '0001',
      SAT_FirstBus: '0617',
      SAT_LastBus: '2400',
      SUN_FirstBus: '0616',
      SUN_LastBus: '2400'
    },
    {
      ServiceNo: '176',
      Operator: 'SMRT',
      Direction: 2,
      StopSequence: 30,
      BusStopCode: '20261',
      Distance: 12,
      WD_FirstBus: '0550',
      WD_LastBus: '0001',
      SAT_FirstBus: '0550',
      SAT_LastBus: '2400',
      SUN_FirstBus: '0550',
      SUN_LastBus: '2400'
    },
    {
      ServiceNo: '176',
      Operator: 'SMRT',
      Direction: 2,
      StopSequence: 31,
      BusStopCode: '20271',
      Distance: 12.4,
      WD_FirstBus: '0551',
      WD_LastBus: '0002',
      SAT_FirstBus: '0551',
      SAT_LastBus: '0001',
      SUN_FirstBus: '0551',
      SUN_LastBus: '0001'
    }
  ]
  const expected = [
    {
      trip_id: '176:WD:1',
      arrival_time: '06:19:00',
      departure_time: '06:19:00',
      stop_id: '20251',
      stop_sequence: 29,
      shape_dist_traveled: 11.8
    },
    {
      trip_id: '176:WD:1',
      arrival_time: '06:19:00',
      departure_time: '06:19:00',
      stop_id: '20261',
      stop_sequence: 30,
      shape_dist_traveled: 12
    },
    {
      trip_id: '176:WD:1',
      arrival_time: '06:20:00',
      departure_time: '06:20:00',
      stop_id: '20271',
      stop_sequence: 31,
      shape_dist_traveled: 12.4
    }
  ]
  const value = formatStopTimes(data)

  t.deepEqual(value, expected)
})

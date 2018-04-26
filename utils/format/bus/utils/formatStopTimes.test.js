const test = require('ava')
const formatStopTimes = require('./formatStopTimes')

test('format: stop_times.txt', (t) => {
  const data = [
    {
      ServiceNo: '18',
      Operator: 'SBST',
      Direction: 1,
      StopSequence: 10,
      BusStopCode: '76079',
      Distance: 3.6,
      WD_FirstBus: '0531',
      WD_LastBus: '0016',
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
      WD_FirstBus: '0534',
      WD_LastBus: '0018',
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
      WD_FirstBus: '0535',
      WD_LastBus: '0020',
      SAT_FirstBus: '0535',
      SAT_LastBus: '0020',
      SUN_FirstBus: '0606',
      SUN_LastBus: '0020'
    },
    {
      ServiceNo: '180',
      Operator: 'SMRT',
      Direction: 2,
      StopSequence: 45,
      BusStopCode: '21681',
      Distance: 18.8,
      WD_FirstBus: '0548',
      WD_LastBus: '2355',
      SAT_FirstBus: '0549',
      SAT_LastBus: '2356',
      SUN_FirstBus: '0557',
      SUN_LastBus: '2359'
    },
    {
      ServiceNo: '180',
      Operator: 'SMRT',
      Direction: 2,
      StopSequence: 46,
      BusStopCode: '21691',
      Distance: 19.1,
      WD_FirstBus: '0550',
      WD_LastBus: '2356',
      SAT_FirstBus: '0550',
      SAT_LastBus: '2357',
      SUN_FirstBus: '0558',
      SUN_LastBus: '2400'
    },
    {
      ServiceNo: '180',
      Operator: 'SMRT',
      Direction: 2,
      StopSequence: 47,
      BusStopCode: '22491',
      Distance: 20.2,
      WD_FirstBus: '0554',
      WD_LastBus: '2400',
      SAT_FirstBus: '0554',
      SAT_LastBus: '0001',
      SUN_FirstBus: '0602',
      SUN_LastBus: '0004'
    }
  ]
  const expected = [
    {
      trip_id: '18:WD:0',
      arrival_time: '05:31:00',
      departure_time: '05:31:00',
      stop_id: '76079',
      stop_sequence: 10,
      shape_dist_traveled: 3.6
    },
    {
      trip_id: '18:WD:0',
      arrival_time: '05:34:00',
      departure_time: '05:34:00',
      stop_id: '75059',
      stop_sequence: 11,
      shape_dist_traveled: 4.3
    },
    {
      trip_id: '18:WD:0',
      arrival_time: '05:35:00',
      departure_time: '05:35:00',
      stop_id: '75069',
      stop_sequence: 12,
      shape_dist_traveled: 5
    },
    {
      trip_id: '180:WD:1',
      arrival_time: '05:48:00',
      departure_time: '05:48:00',
      stop_id: '21681',
      stop_sequence: 45,
      shape_dist_traveled: 18.8
    },
    {
      trip_id: '180:WD:1',
      arrival_time: '05:50:00',
      departure_time: '05:50:00',
      stop_id: '21691',
      stop_sequence: 46,
      shape_dist_traveled: 19.1
    },
    {
      trip_id: '180:WD:1',
      arrival_time: '05:54:00',
      departure_time: '05:54:00',
      stop_id: '22491',
      stop_sequence: 47,
      shape_dist_traveled: 20.2
    }
  ]
  const value = formatStopTimes(data)

  t.deepEqual(value, expected)
})

test('format: stop_times.txt, non-weekdays', (t) => {
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

test('validate: bus stop times, arrival > departure', (t) => {
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

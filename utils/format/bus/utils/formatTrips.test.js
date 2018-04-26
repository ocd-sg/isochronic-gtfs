const test = require('ava')
const formatTrips = require('./formatTrips')

test('format: trips.txt', (t) => {
  const data = [
    {
      ServiceNo: '599',
      Operator: 'SMRT',
      Direction: 1,
      Category: 'FLAT FARE $5.00',
      OriginCode: '64449',
      DestinationCode: '03218',
      AM_Peak_Freq: '-',
      AM_Offpeak_Freq: '-',
      PM_Peak_Freq: '-',
      PM_Offpeak_Freq: '-',
      LoopDesc: ''
    },
    {
      ServiceNo: '599',
      Operator: 'SMRT',
      Direction: 2,
      Category: 'FLAT FARE $5.00',
      OriginCode: '64449',
      DestinationCode: '03218',
      AM_Peak_Freq: '-',
      AM_Offpeak_Freq: '-',
      PM_Peak_Freq: '-',
      PM_Offpeak_Freq: '-',
      LoopDesc: ''
    }
  ]
  const expected = [
    {
      trip_id: '599:WD:0',
      route_id: '599',
      service_id: 'WD',
      direction_id: 0
    },
    {
      trip_id: '599:WD:1',
      route_id: '599',
      service_id: 'WD',
      direction_id: 1
    }
  ]
  const value = formatTrips(data)

  t.deepEqual(value, expected)
})

test('format: trips.txt, unique IDs', (t) => {
  const data = [
    {
      ServiceNo: '599',
      Operator: 'SMRT',
      Direction: 1,
      Category: 'FLAT FARE $5.00',
      OriginCode: '64449',
      DestinationCode: '03218',
      AM_Peak_Freq: '-',
      AM_Offpeak_Freq: '-',
      PM_Peak_Freq: '-',
      PM_Offpeak_Freq: '-',
      LoopDesc: ''
    },
    {
      ServiceNo: '599',
      Operator: 'SMRT',
      Direction: 1,
      Category: 'FLAT FARE $5.00',
      OriginCode: '64449',
      DestinationCode: '03218',
      AM_Peak_Freq: '-',
      AM_Offpeak_Freq: '-',
      PM_Peak_Freq: '-',
      PM_Offpeak_Freq: '-',
      LoopDesc: ''
    }
  ]
  const expected = [
    {
      trip_id: '599:WD:0',
      route_id: '599',
      service_id: 'WD',
      direction_id: 0
    }
  ]
  const value = formatTrips(data)

  t.deepEqual(value, expected)
})

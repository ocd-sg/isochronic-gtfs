const test = require('ava')
const formatTrips = require('./formatTrips')

test('format: trips.txt', (t) => {
  const data = [
    {
      id: 'CC',
      directions: [
        { direction: 0 },
        { direction: 1 }
      ]
    },
    {
      id: 'DT',
      directions: [
        { direction: 0 },
        { direction: 1 }
      ]
    }
  ]
  const expected = [
    {
      trip_id: 'CC:WD:0',
      route_id: 'CC',
      service_id: 'WD',
      direction_id: 0
    },
    {
      trip_id: 'CC:WD:1',
      route_id: 'CC',
      service_id: 'WD',
      direction_id: 1
    },
    {
      trip_id: 'DT:WD:0',
      route_id: 'DT',
      service_id: 'WD',
      direction_id: 0
    },
    {
      trip_id: 'DT:WD:1',
      route_id: 'DT',
      service_id: 'WD',
      direction_id: 1
    }
  ]
  const value = formatTrips(data)

  t.deepEqual(value, expected)
})

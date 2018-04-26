const test = require('ava')
const formatStops = require('./formatStops')

test('format: stops.txt', (t) => {
  const data = [
    {
      BusStopCode: 'N4579',
      RoadName: 'Choa Chu Kang Cres',
      Description: 'Blk 675',
      Latitude: 1.40151660580446,
      Longitude: 103.74583090707071
    }
  ]
  const expected = [
    {
      stop_id: 'N4579',
      stop_name: 'Blk 675',
      stop_lat: 1.40151660580446,
      stop_lon: 103.74583090707071
    }
  ]
  const value = formatStops(data)

  t.deepEqual(value, expected)
})

test('format: handles inverted lat/lon data points', (t) => {
  const data = [
    {
      BusStopCode: 'N4579',
      RoadName: 'Choa Chu Kang Cres',
      Description: 'Blk 675',
      Latitude: 103.74583090707071,
      Longitude: 1.40151660580446
    }
  ]
  const expected = [
    {
      stop_id: 'N4579',
      stop_name: 'Blk 675',
      stop_lat: 1.40151660580446,
      stop_lon: 103.74583090707071
    }
  ]
  const value = formatStops(data)

  t.deepEqual(value, expected)
})

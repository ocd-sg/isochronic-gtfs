const test = require('ava')
const formatStops = require('./formatStops')

test('format: stops.txt', (t) => {
  const data = [
    {
      id: 53,
      ref: 'DT1',
      refs: ['DT1'],
      name: 'Bukit Panjang',
      lat: 1.378629,
      lon: 103.7621358
    }
  ]
  const expected = [
    {
      stop_id: 53,
      stop_name: 'Bukit Panjang',
      stop_lat: 1.378629,
      stop_lon: 103.7621358
    }
  ]
  const value = formatStops(data)

  t.deepEqual(value, expected)
})

test('format: handles inverted lat/lon data points', (t) => {
  const data = [
    {
      id: 53,
      ref: 'DT1',
      refs: ['DT1'],
      name: 'Bukit Panjang',
      lat: 103.7621358,
      lon: 1.378629
    }
  ]
  const expected = [
    {
      stop_id: 53,
      stop_name: 'Bukit Panjang',
      stop_lat: 1.378629,
      stop_lon: 103.7621358
    }
  ]
  const value = formatStops(data)

  t.deepEqual(value, expected)
})

const test = require('ava')
const formatRoutes = require('./formatRoutes')

test('format: routes.txt', (t) => {
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
      route_id: '599',
      route_short_name: '599',
      route_long_name: '',
      route_type: 3
    }
  ]
  const value = formatRoutes(data)

  t.deepEqual(value, expected)
})

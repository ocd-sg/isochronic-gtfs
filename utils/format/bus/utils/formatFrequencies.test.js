const test = require('ava')
const formatFrequencies = require('./formatFrequencies')

test('format: frequencies.txt', (t) => {
  const data = [
    {
      ServiceNo: '225',
      Operator: 'SBST',
      Direction: 2,
      Category: 'FEEDER',
      OriginCode: '84009',
      DestinationCode: '84009',
      AM_Peak_Freq: '04-06',
      AM_Offpeak_Freq: '05-09',
      PM_Peak_Freq: '04-07',
      PM_Offpeak_Freq: '04-10',
      LoopDesc: 'Bedok North St 3'
    }
  ]
  const expected = [
    {
      trip_id: '225:WD:1',
      start_time: '05:00:00',
      end_time: '06:30:00',
      headway_secs: 420
    },
    {
      trip_id: '225:WD:1',
      start_time: '06:30:00',
      end_time: '08:30:00',
      headway_secs: 300
    },
    {
      trip_id: '225:WD:1',
      start_time: '08:30:00',
      end_time: '17:00:00',
      headway_secs: 420
    },
    {
      trip_id: '225:WD:1',
      start_time: '17:00:00',
      end_time: '19:00:00',
      headway_secs: 330
    },
    {
      trip_id: '225:WD:1',
      start_time: '19:00:00',
      end_time: '25:00:00',
      headway_secs: 420
    }
  ]
  const value = formatFrequencies(data)

  t.deepEqual(value, expected)
})

test('format: frequencies.txt, single values', (t) => {
  const data = [
    {
      ServiceNo: '225',
      Operator: 'SBST',
      Direction: 2,
      Category: 'FEEDER',
      OriginCode: '84009',
      DestinationCode: '84009',
      AM_Peak_Freq: '04',
      AM_Offpeak_Freq: '05',
      PM_Peak_Freq: '04',
      PM_Offpeak_Freq: '04',
      LoopDesc: 'Bedok North St 3'
    }
  ]
  const expected = [
    {
      trip_id: '225:WD:1',
      start_time: '05:00:00',
      end_time: '06:30:00',
      headway_secs: 300
    },
    {
      trip_id: '225:WD:1',
      start_time: '06:30:00',
      end_time: '08:30:00',
      headway_secs: 240
    },
    {
      trip_id: '225:WD:1',
      start_time: '08:30:00',
      end_time: '17:00:00',
      headway_secs: 300
    },
    {
      trip_id: '225:WD:1',
      start_time: '17:00:00',
      end_time: '19:00:00',
      headway_secs: 240
    },
    {
      trip_id: '225:WD:1',
      start_time: '19:00:00',
      end_time: '25:00:00',
      headway_secs: 240
    }
  ]
  const value = formatFrequencies(data)

  t.deepEqual(value, expected)
})

test('format: frequencies.txt, missing values', (t) => {
  const data = [
    {
      ServiceNo: '225',
      Operator: 'SBST',
      Direction: 2,
      Category: 'FEEDER',
      OriginCode: '84009',
      DestinationCode: '84009',
      AM_Peak_Freq: '-',
      AM_Offpeak_Freq: '00-00',
      PM_Peak_Freq: '-',
      PM_Offpeak_Freq: '04',
      LoopDesc: 'Bedok North St 3'
    }
  ]
  const expected = [
    {
      trip_id: '225:WD:1',
      start_time: '19:00:00',
      end_time: '25:00:00',
      headway_secs: 240
    }
  ]
  const value = formatFrequencies(data)

  t.deepEqual(value, expected)
})

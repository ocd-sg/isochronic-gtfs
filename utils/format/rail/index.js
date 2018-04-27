const fs = require('fs')
const { resolve } = require('path')
const { Observable } = require('rxjs')
const ora = require('ora')
const d3 = require('d3-dsv')

const formatRail = () => {
  const spinner = ora('format light rail GTFS').start()

  const source$ = Observable.from(['frequencies', 'routes', 'stop_times', 'stops', 'trips'])
    .map((key) => ({
      key,
      value: d3.csvParse(
        fs.readFileSync(
          resolve(__dirname, `data/${key}.txt`),
          'utf8'
        )
      )
    }))
    .reduce((memo, d) => ({ ...memo, [d.key]: d.value }), {})
    .delay(1000)

  const spinner$ = source$
    .finally(() => spinner.succeed())

  return spinner$
}

module.exports = formatRail

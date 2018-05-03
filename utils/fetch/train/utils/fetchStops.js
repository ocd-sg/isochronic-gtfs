const zlib = require('zlib')
const { Observable } = require('rxjs')
const ora = require('ora')
const axios = require('axios')
const { DOMParser } = require('xmldom')
const osmtogeojson = require('osmtogeojson')
const parseStops = require('./parseStops')

const title = 'fetch train stops'
const spinner = ora()

const source$ = Observable.of(null)
  .do(() => spinner.start())
  .do(() => { spinner.text = `${title}: fetching station ids` })
  .concatMap(() =>
    Observable.fromPromise(
      axios({
        method: 'get',
        url: 'https://www.mytransport.sg/content/mytransport/home/commuting/trainservices.html',
        responseType: 'text'
      })
      .then(({ data }) => data)
      .catch((error) => spinner.warn(`${title}: error when fetching station id`))
    )
  )
  .map(parseStops)
  .do(() => { spinner.text = `${title}: downloading osm` })
  .concatMap((stops) =>
    Observable.fromPromise(
      axios({
        url: 'http://download.bbbike.org/osm/bbbike/Singapore/Singapore.osm.gz',
        responseType: 'arraybuffer'
      })
      .then(({ data }) => data)
      .catch(() => spinner.warn(`${title}: error when downloading osm`))
    )
      .do(() => { spinner.text = `${title}: unpacking osm` })
      .map((data) => zlib.gunzipSync(data).toString())
      .map((buffer) => buffer.toString())
      .do(() => { spinner.text = `${title}: parsing osm` })
      .map((osm) => new DOMParser().parseFromString(osm, 'text/xml'))
      .map((dom) => osmtogeojson(dom))
      .do(() => { spinner.text = `${title}: extracting stops` })
      .map(({ features }) =>
        features
          .filter((feature) => feature.geometry.type === 'Point')
          .filter((feature) => feature.properties.ref)
          .map((feature) => ({
            ...feature,
            properties: {
              ...feature.properties,
              refs: feature.properties.ref.split(';')
            }
          }))
          .filter((feature) =>
            feature.properties.refs.filter(
              (ref) => stops.reduce((memo, { codes }) => [ ...memo, ...codes ], []).includes(ref)
            ).length
          )
      )
      .do((features) => {
        const matched = features.reduce((memo, feature) => [ ...memo, ...feature.properties.refs ], [])
        const missing = stops.reduce((memo, { codes }) => [ ...memo, ...codes ], []).filter((id) => !matched.includes(id))
        if (missing.length) spinner.info(`train stops without coordinates: ${missing.join(', ')}`)
      })
      .map((features) =>
        features
          .map((feature) => ({
            id: stops.find(({ codes }) => codes.filter((id) => feature.properties.refs.includes(id)).length).id,
            ref: feature.properties.ref,
            refs: feature.properties.refs,
            name: feature.properties.name,
            lat: feature.geometry.coordinates[1],
            lon: feature.geometry.coordinates[0]
          }))
      )
  )
  .do((stops) => { spinner.text = `${title}: ${stops.length}` })
  .finally(() => spinner.succeed())
  .publishReplay(1)
  .refCount()

module.exports = () => source$

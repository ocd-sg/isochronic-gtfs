const { Observable } = require('rxjs')
const axios = require('axios')

const fetch = (key) => (resource) => (skip) =>
  Observable.fromPromise(axios.request({
    url: `http://datamall2.mytransport.sg/ltaodataservice/${resource}`,
    method: 'get',
    params: {$skip: skip},
    headers: {'AccountKey': key}
  }))
    .map(({ data }) => data)
    .map(({ value }) => value)

module.exports = fetch

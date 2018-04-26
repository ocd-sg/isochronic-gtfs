const format = ({
  ServiceNo: route_id,
  Direction: _direction_id
}) => {
  const service_id = 'WD'
  const direction_id = _direction_id === 1 ? 0 : 1
  const trip_id = [route_id, service_id, direction_id].join(':')
  return {
    trip_id,
    route_id,
    service_id,
    direction_id
  }
}

const formatTrips = (services) =>
  services
    .map(format)
    .reduce((memo, d) =>
      memo.find(({ trip_id }) => trip_id === d.trip_id)
        ? memo
        : [ ...memo, d ]
    , [])

module.exports = formatTrips

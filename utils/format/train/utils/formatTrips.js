const format = ({
  id: route_id,
  direction: direction_id
}) => {
  const service_id = 'WD'
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
    .reduce((memo, service) => [ ...memo, ...service.directions.map(({ direction }) => ({ id: service.id, direction })) ], [])
    .map(format)
    .reduce((memo, d) =>
      memo.find(({ trip_id }) => trip_id === d.trip_id)
        ? memo
        : [ ...memo, d ]
    , [])

module.exports = formatTrips

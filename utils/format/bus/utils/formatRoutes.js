const format = ({
  ServiceNo: route_id,
  ServiceNo: route_short_name
}) => ({
  route_id,
  route_short_name,
  route_long_name: '',
  route_type: 3
})

const formatRoutes = (routes) =>
  routes
    .map(format)
    .reduce((memo, d) =>
      memo.find(({ route_id }) => d.route_id === route_id)
        ? memo
        : [ ...memo, d ]
    , [])

module.exports = formatRoutes

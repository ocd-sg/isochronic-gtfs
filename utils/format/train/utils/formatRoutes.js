const format = ({
  id: route_id,
  id: route_short_name
}) => ({
  route_id,
  route_short_name,
  route_long_name: '',
  route_type: 1
})

const formatRoutes = (services) =>
  services
    .map(format)
    .reduce((memo, d) =>
      memo.find(({ route_id }) => d.route_id === route_id)
        ? memo
        : [ ...memo, d ]
    , [])

module.exports = formatRoutes

const createLabel = (resource) =>
  resource
    .replace(
      /[A-Z]/g,
      (char) => `_${char.toLowerCase()}`
    )
    .replace(/^_/, '')
    .replace(/_/g, ' ')

module.exports = createLabel

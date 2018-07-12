export function deepMerge(target, source = {}) {
  const extended = Object.assign({}, target)

  Object.keys(source).forEach((key) => {
    if (typeof source[key] !== 'object' || !source[key]) {
      extended[key] = source[key]
    }
  })
}

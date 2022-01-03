export function deepMerge(source, target = {}) {
  const extended = Object.assign({}, target);

  Object.keys(source).forEach((key) => {
    if (typeof source[key] !== "object" || !source[key]) {
      extended[key] = source[key];
    } else {
      if (!target[key]) {
        extended[key] = source[key];
      } else {
        extended[key] = deepMerge(target[key], source[key]);
      }
    }
  });
  return extended;
}
// export function deepMerge(source, target = {}) {
//   // initialize with source styles
//   const styles = { ...source }

//   // massage in target styles
//   Object.keys(target).forEach(key => {
//     if (source[key]) {
//       styles[key] = (rsCss, props) => {
//         return target[key](source[key](rsCss, props), props)
//       }
//     } else {
//       styles[key] = target[key]
//     }
//   })

//   return styles
// }

export const canUseDom = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

/**
 * Bind multiple conponent methods:
 * @param {this} context
 * @param {Array} functions
 *
 * constructor() {
 *   ...
 *   bindFunctions.call(this, ['handleClick', 'handleOther'])
 * }
 */
export function bindFunctions(functions) {
  functions.forEach((f) => (this[f] = this[f].bind(this)));
}

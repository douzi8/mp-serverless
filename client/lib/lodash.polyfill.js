let g;

// This works in non-strict mode
g = (function() {
  return this;
})();

try {
  // This works if eval is allowed (see CSP)
  // eslint-disable-next-line
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
}

Object.assign(g, {
  Array,
  Date,
  Error,
  Function,
  Math,
  Object,
  RegExp,
  String,
  TypeError,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval
});

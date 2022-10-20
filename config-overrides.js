module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: false,
    url: require.resolve("url"),
    path: false,
    domain: require.resolve("domain-browser"),
    console: require.resolve("console-browserify"),
    zlib: require.resolve("browserify-zlib"),
    constants: require.resolve("constants-browserify"),
    vm: require.resolve("vm-browserify"),
    fs: false,
    net: false,
    child_process: false,
    repl: false,
    module: false,
    async_hooks: false,
    tls: false,
    "util/types": false,
    perf_hooks: false,
    "stream/web": false,
  });
  config.resolve.fallback = fallback;

  return config;
};

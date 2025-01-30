const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const customConfig = {
  resolver: {
    extraNodeModules: {
      ...require("node-libs-react-native"), // Polyfills for Node.js core modules
      stream: require.resolve("readable-stream"), // Ensure `stream` resolves correctly
    },
  },
};

module.exports = mergeConfig(defaultConfig, customConfig);
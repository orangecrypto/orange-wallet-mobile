const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const customConfig = {
  resolver: {
    extraNodeModules: {
      stream: require.resolve("stream-browserify"), 
      buffer: require.resolve("react-native-buffer"),
      ...require("node-libs-react-native"), // Polyfills for Node.js core modules
    },
  },
};

module.exports = mergeConfig(defaultConfig, customConfig);
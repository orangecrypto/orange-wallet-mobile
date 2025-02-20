const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const nodeLibs = require("node-libs-react-native");
const customConfig = {
  resolver: {
    extraNodeModules: {
      ...require("node-libs-react-native"), 
      stream: require.resolve("stream-browserify"), 
      buffer: require.resolve("react-native-buffer"),
      crypto: require.resolve("crypto-browserify"),
      extraNodeModules: nodeLibs,
     
      
    },
  },
};

module.exports = mergeConfig(defaultConfig, customConfig);
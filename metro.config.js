// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);
// const nodeLibs = require("node-libs-react-native");
// const customConfig = {
//   resolver: {
//     extraNodeModules: {
//       ...require("node-libs-react-native"), 
//       stream: require.resolve("stream-browserify"), 
//       buffer: require.resolve("react-native-buffer"),
//       crypto: require.resolve("react-native-crypto"), 
//       extraNodeModules: nodeLibs,
     
      
//     },
//   },
// };

// module.exports = mergeConfig(defaultConfig, customConfig);


const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const nodeLibs = require("node-libs-react-native");

const customConfig = {
  resolver: {
    extraNodeModules: {
      ...nodeLibs, // Load all necessary node modules
      stream: require.resolve("readable-stream"), // Required for some crypto functions
      buffer: require.resolve("buffer"), // Buffer polyfill
      crypto: require.resolve("crypto-browserify"),
    },
  },
};

module.exports = mergeConfig(defaultConfig, customConfig);

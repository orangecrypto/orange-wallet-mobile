module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@screens": "./src/screens",
          "@components": "./src/components",
          "@utils": "./src/utils",
          "@navigation": "./src/navigation",
          "@routes": "./src/routes",
          "@values": "./src/resources/values",
          "@assets": "./src/resources/assets",
          "@strings": "./src/resources/locale",
          "@redux": "./src/redux",
          "@hooks": "./src/hooks",
          "@services": "./src/services",
           "@config": "./src/config"

        },
      },
    ]
  ],
};

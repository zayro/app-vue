module.exports = {
  devServer: {
    // open: process.platform === "darwin",
    host: '0.0.0.0',
    port: 8080, // CHANGE YOUR PORT HERE!
    https: false,
    hotOnly: true
  },
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true,
      exclude: [/_redirects/]
    }
  },
  configureWebpack: {
    devtool: "source-map"
  }
}

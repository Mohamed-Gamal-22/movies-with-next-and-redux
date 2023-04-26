/** @type {import('next').NextConfig} */

// first step to use carousel library
const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: true,

  // second step to use carousel library
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );

    return config;
  },
};

module.exports = nextConfig;

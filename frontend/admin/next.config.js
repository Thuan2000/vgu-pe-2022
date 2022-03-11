/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

module.exports = {
  i18n,
  reactStrictMode: true,
  images: {
    domains: [
      "sdconnect-dev.s3.ap-southeast-1.amazonaws.com",
      "sdconnect-assets.s3.ap-southeast-1.amazonaws.com",
      "testing-sdconnect.s3.ap-southeast-1.amazonaws.com",
      "prod-sdconnect-api-stack-devsdconnects3b-s3bucket-87pd4i2k4p5x.s3.ap-southeast-1.amazonaws.com",
      "dev-sdconnect-stack-devsdconnects3bucket-s3bucket-186popcyz68z3.s3.ap-southeast-1.amazonaws.com",
    ],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: "graphql-let/loader" }],
    });

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: ["graphql-let/schema/loader"],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: "json",
      use: "yaml-loader",
    });

    return config;
  },
};

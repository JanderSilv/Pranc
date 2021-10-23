/** @type {import('next').NextConfig} */

const withReactSvg = require('next-react-svg')
const path = require('path')

module.exports = {
  reactStrictMode: true,
  ...withReactSvg({
    include: path.resolve(__dirname, 'public/assets/icons'),
    webpack(config) {
      return config
    },
  }),
}

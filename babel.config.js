module.exports = {
  "presets": [
    ["@babel/env", {
      "loose": true,
      "modules": "cjs"
    }],
    "@babel/preset-react",
    "@babel/typescript"
  ],
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread",
    ["@babel/plugin-transform-runtime", {
      "useESModules": true
    }],
  ]
}

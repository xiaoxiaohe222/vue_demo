module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],

  "plugins": [["component",
    {
      "libraryName": "mint-ui", //针对mint-ui实现按需打包
      "style": true //自动打包对应的css样式
    }
  ]]

}

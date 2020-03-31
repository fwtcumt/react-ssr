// 生产环境中 静态资源的处理

module.exports = function() {

  const jsFiles = ['libs.js','main.js'];
  const cssFiles = ['main.css'];

  const assets = {
    js: [],
    css: []
  };

  if (!__IS_PROD__) {
    // 开发环境
    assets.js.push(`<script type="text/javascript"  src="/libs.js"></script>`);
    assets.js.push(`<script type="text/javascript"  src="/main.js"></script>`);
    assets.css.push(`<link rel="stylesheet" type="text/css" href="/main.css" />`);
  } else {
    // 从 asset-manifest.json 读取资源
    const map = require('@dist/server/asset-manifest.json');
    jsFiles.forEach(item => {
        if(map[item]) {
          assets.js.push(`<script type="text/javascript"  src="${map[item]}"></script>`);
        }
    });
    cssFiles.forEach(item => {
      if(map[item]) {
        assets.css.push(`<link rel="stylesheet" type="text/css" href="${map[item]}" />`)
      }  
    });
  }

  return assets;
}

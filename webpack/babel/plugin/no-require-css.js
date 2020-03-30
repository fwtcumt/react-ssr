// babel插件，删除代码中导入的样式文件

module.exports = function() {
  return {
    name: 'no-require-css',
    visitor: {
      ImportDeclaration: path => {
        const importFile = path.node.source.value;
        const hasLess = importFile.indexOf('.less') > -1;
        const hasCss = importFile.indexOf('.css') > -1;
        if(hasLess || hasCss){
          path.remove();
        }
      }
    }
  };
}

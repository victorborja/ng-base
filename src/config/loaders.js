// http://webpack.github.io/docs/context.html#context-module-api
// these paths are relative to the compiled file at .tmp/js
const htmlContext = require.context('../../../src/components', true, /.html$/);
const cssContext = require.context('../../css/components', true, /.css$/);

function loader(context, ext) {
  return function contextLoader(name) {
    return context(`./${name}.${ext}`);
  };
}

const componentHtml = loader(htmlContext, 'html');
const componentCss = loader(cssContext, 'css');
export function componentView(name) {
  try {
    componentCss(name);
  // } catch (e) {
  //   console.log(e.message);
  } finally {
    return componentHtml(name);
  }
}


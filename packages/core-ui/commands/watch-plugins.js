var watch = require('node-watch');
var { resolve } = require("path");
var fse = require('fs-extra');

const filePath = (pathName) => {
  if (pathName) {
    return resolve(__dirname, '..', pathName);
  }

  return resolve(__dirname, '..');
}

var watcher = watch('../../packages', { recursive: true, filter: 'configs.js', delay: 1000 });

watcher.on("change", function(evt, name) {
  const pluginNames = fse.readdirSync(filePath('../../packages'));
  const pluginsConfigs = [];

  for (const pluginName of pluginNames) {
    if (pluginName === '.DS_Store' || !pluginName.startsWith('plugin-') || pluginName.includes('api')) {
      continue;
    }

    var module = filePath(`../../packages/${pluginName}/src/configs.js`);
    delete require.cache[require.resolve(module)];
    var configs = require(module);

    pluginsConfigs.push(configs);
  }

  const content = `
    window.plugins = ${JSON.stringify(pluginsConfigs)}
  `

  fse.writeFileSync(filePath('./public/js/plugins.js'), content);
});

var templatePath = filePath('../ui-plugin-template/.erxes');

var onChangeTemplate = () => {
  const pluginNames = fse.readdirSync(filePath('..'));

  for (const pluginName of pluginNames) {
    if (pluginName.startsWith('plugin-') && pluginName.endsWith('ui')) {
                              
      try {
        fse.copySync(templatePath, filePath(`../${pluginName}/.erxes`), { overwrite: true });
        console.log(`successfully updated ${pluginName}`)
      } catch (e) {
        console.log(e.message)
      }
    }
  }
};

watch(templatePath, { recursive: true, delay: 1000 }).on("change", onChangeTemplate);

onChangeTemplate();
const jsdoc2md = require("jsdoc-to-markdown");
const path = require("path");
const fs = require("fs");

const inputPattern = path.resolve(__dirname, "src/*.js");
const outputDir = path.resolve(__dirname, "docs/classes");
const configFile = path.resolve(__dirname, "jsdoc.config.js");

const templateData = jsdoc2md.getTemplateDataSync({
  files: inputPattern,
  configure: configFile,
});

const classNames = templateData.reduce((classNames, identifier) => {
  if (identifier.kind === "class") classNames.push(identifier.name);
  return classNames;
}, []);

/* create a documentation file for each class */
for (const className of classNames) {
  const template = `{{#class name="${className}"}}{{>docs}}{{/class}}`;
  console.log(`rendering ${className}, template: ${template}`);
  const output = jsdoc2md.renderSync({
    data: templateData,
    template: template,
  });
  fs.writeFileSync(path.resolve(outputDir, `${className}.md`), output);
}

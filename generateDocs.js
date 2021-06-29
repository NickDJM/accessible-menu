const jsdoc2md = require("jsdoc-to-markdown");
const path = require("path");
const fs = require("fs");

const sourceDir = path.resolve(__dirname, "src/");
const inputPattern = path.resolve(sourceDir, "*.js");
const docsDir = path.resolve(__dirname, "docs/");
const outputDir = path.resolve(docsDir, "classes/");
const configFile = path.resolve(__dirname, "jsdoc.config.js");

const templateData = jsdoc2md.getTemplateDataSync({
  files: inputPattern,
  configure: configFile,
});
const validationData = jsdoc2md.getTemplateDataSync({
  files: path.resolve(sourceDir, "validate.js"),
  configure: configFile,
});
const eventData = jsdoc2md.getTemplateDataSync({
  files: path.resolve(sourceDir, "eventHandlers.js"),
  configure: configFile,
});
const validationOutput = jsdoc2md.renderSync({
  data: validationData,
});
const eventOutput = jsdoc2md.renderSync({
  data: eventData,
});
const classNames = templateData.reduce((classNames, identifier) => {
  if (identifier.kind === "class") classNames.push(identifier.name);
  return classNames;
}, []);

/* create a documentation file for each class */
for (const className of classNames) {
  const template = `
    {{#class name="${className}"}}
    {{>docs}}
    {{/class}}
  `;
  const output = jsdoc2md.renderSync({
    data: templateData,
    template: template,
  });
  fs.writeFileSync(path.resolve(outputDir, `${className}.md`), output);
}

fs.writeFileSync(path.resolve(docsDir, "validate.md"), validationOutput);
fs.writeFileSync(path.resolve(docsDir, "eventHandlers.md"), eventOutput);

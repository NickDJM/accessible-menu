/**
 * @file
 * A custom updater for standard-version that finds all instances of the
 * version in the README file and updates them.
 */

/* eslint-disable jsdoc/require-returns-check */

/**
 * Get the current version of the README file.
 *
 * @param  {string} contents - The contents of the file.
 * @return {string}          - The version number.
 */
module.exports.readVersion = (contents) => {
  try {
    const version = contents
      .match(/\/accessible-menu@\d+\.\d+\.\d+(-.*?\.\d+)?\//)[0]
      .replace("accessible-menu@", "");

    return version;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Update all instances of the version of the README file.
 *
 * @param  {string} contents - The contents of the file.
 * @param  {string} version  - The new version number.
 * @return {string}          - The new contents of the file.
 */
module.exports.writeVersion = (contents, version) => {
  return contents.replace(
    /\/accessible-menu@\d+\.\d+\.\d+(-.*?\.\d+)?\//g,
    `/accessible-menu@${version}/`
  );
};

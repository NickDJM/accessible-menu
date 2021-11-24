// Get the current version from the README.
module.exports.readVersion = (contents) => {
  try {
    const version = contents
      .match(/accessible-menu@\d\.\d\.\d/)[0]
      .replace("accessible-menu@", "");

    return version;
  } catch (error) {
    console.error(error);
  }
};

// Update all versions of the README.
module.exports.writeVersion = (contents, version) => {
  return contents.replace(
    /accessible-menu@\d\.\d\.\d/g,
    `accessible-menu@${version}`
  );
};

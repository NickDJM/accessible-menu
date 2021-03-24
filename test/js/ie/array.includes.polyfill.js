if (!Array.includes) {
  Array.prototype.includes = function(search) {
    return !!~this.indexOf(search);
  }
}
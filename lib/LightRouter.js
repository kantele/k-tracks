function LightRouter() {
  this.routes = [];
  this.root = '/';
}

LightRouter.prototype.add = function(path, cb) {
  this.routes.push({ path, cb });
  return this;
};

LightRouter.prototype.clearSlashes = function(path) {
  return path
    .toString()
    .replace(/\/$/, '')
    .replace(/^\//, '');
};

LightRouter.prototype.getUrl = function() {
  let fragment = '';
  fragment = this.clearSlashes(decodeURI(window.location.pathname));
  fragment = fragment.replace(/\?(.*)$/, '');
  fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
  return this.clearSlashes(fragment);
};

LightRouter.prototype.run = function() {
  const url = this.getUrl();

  this.routes.some(function (route) {
    const match = url.match(route.path);
    if (match) {
      match.shift();
      route.cb.apply({}, match);
      return match;
    }
    return false;
  });
};

module.exports = LightRouter;

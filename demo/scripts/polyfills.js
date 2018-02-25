(function() {

  if ('registerElement' in document
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template')) {
    // platform is good!
  } else {
    // polyfill the platform!
    var e = document.createElement('script');
    e.src = '/node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js';
    document.body.appendChild(e);
  }
})();
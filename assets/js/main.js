// style css for webpack builder
require('../scss/main.scss');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/assets/sw.js')
    .then(registration => {
      // Successful registration
      console.log('Hooray. Registration successful, scope is:', registration.scope); // eslint-disable-line
    })
    .catch(err => {
      // Failed registration, service worker won’t be installed
      console.log('Whoops. Service worker registration failed, error:', err); // eslint-disable-line
    });
}

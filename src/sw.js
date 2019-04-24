workbox.setConfig({
  debug: true,
});
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);


if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
workbox.setConfig({
  debug: true,
});
console.log(self.__precacheManifest);
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);




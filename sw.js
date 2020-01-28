
var CACHE_STATIC_NAME = 'static-v4';
var CACHE_DYNAMIC_NAME = 'dynamic-v2';

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          '/',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
          'index.html',
          'about2.html',
          'about.html',
          'atm.html',
          'contactus.html',
          'contact.html',
          'contact2.html',
          'hotel.html',
          'index.html',
          'map.html',
          'news.html',
          'places.html',
          'tyl.html',
          'yellowfevicon.png',
          '/js/app.js',
          '/js/find.js',
          '/js/login.js',
          '/js/fetch.js',
          '/js/material.min.js',
          '/css/map.css',
          '/css/style1.css',
          '/css/styles.css',
          '/font/rimouski_sb-webfont.ttf',
          '/font/rimouski_sb-webfont.woff',
          '/font/rimouski_sb-webfont.woff2',
          '/Remouski.css',
          '/images/about1.jpg',
          '/images/car.png',
          '/images/city.png',
          '/images/contactus.png',
          '/images/login icon1.jpg',
          '/images/login1.jpg',
          '/images/road.jpg',
          '/images/sky.jpg',
          '/images/wheel.png',
          '/images/contactus.png',
          '/js/app.js',
          '/js/find.js',
          '/js/login.js',
          '/js/news.js',
          '/js/tyl.js',
          '/js/stylish-portfolio.js',
          '/js/stylish-portfolio.min.js',
          '/img/bg-callout.jpg',
          '/img/bg-masthead.jpg',
          '/img/portfolio-1.jpg',
          '/img/portfolio-2.jpg',
          '/img/portfolio-3.jpg',
          '/img/portfolio-4.jpg',
          

          

        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function(err) {

            });
        }
      })
  );
});
var cacheName = 'Cache v1';
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(cacheName).then(cache => {
    return cache.addAll([
      {{- range readDir "/static/animations/" -}}
        '/animations/{{- .Name -}}',
      {{- end -}}
      {{- range readDir "/static/css/" -}}
        '/css/{{- .Name -}}',
      {{- end -}}
      '/css/styles.css',
      {{- range readDir "/static/js/" -}}
        '/js/{{- .Name -}}',
      {{- end -}}
      '/js/logic.js',
      {{- range readDir "/static/images/" -}}
        '/images/{{- .Name -}}',
      {{- end -}}
      '/images/sprites.svg',
      '/favicon.ico',
      '/index.json',
      '/offline/',
      '/404/',
      '/'
    ]);
  }));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(currentCacheName => {
      if (cacheName.indexOf(currentCacheName) === -1) {
        return caches.delete(currentCacheName)
      };
    }));
  }));
});
self.addEventListener('fetch', event => {
  if (event.request.method === 'POST') {
    return;
  };
  event.respondWith(caches.match(event.request).then(response => {
    if (response) {
      return response;
    };
    return fetch(event.request).then(response => {
      if (response.status === 404) {
        return caches.match('/404/');
      };
      return response;
    });
  }).catch(function() {
      return caches.match('/offline/');
  }));
});
const C="emb-prod-v1";
const A=["./","./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png","https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(ch=>ch.put(e.request,c));return r}).catch(()=>caches.match(e.request)))});

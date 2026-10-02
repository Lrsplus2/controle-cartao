// Service worker: rede primeiro (sempre pega a versão nova ao abrir), cache como reserva offline.
const V='gcc-shell';
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))));
});

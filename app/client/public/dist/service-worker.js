if ('serviceWorker' in navigator && !this.hasOwnProperty('ServiceWorkerGlobalScope')) {
	var ownUrl = new URL(document.currentScript.src);

	// Before the worker inits, keep tileserver URLs temporarily here
	var oldTileLayerProto = L.extend({}, L.TileLayer.prototype);

	L.TileLayer._urlsToWatch = [];
	L.TileLayer.prototype.initialize = function(url, options) {
		L.TileLayer._urlsToWatch.push(url);
		return oldTileLayerProto.initialize.call(this, url, options);
	}

	// When the worker inits, send the list of URLs to watch for
	function onWorkerState(worker, state) {
		var state = worker.state;
		if (state !== 'activated') { return; }

		console.log('Service worker is active: ', worker, L.TileLayer._urlsToWatch);

		for (var i in L.TileLayer._urlsToWatch) {
			worker.postMessage({type: 'registerTileLayer', url: L.TileLayer._urlsToWatch[i]});
		}

		// Redefine tilelayer init code
		L.TileLayer.prototype.initialize = function(url, options) {
			worker.postMessage({type: 'registerTileLayer', url: url});
			return oldTileLayerProto.initialize.call(this, url, options);
		}

	}

	// Register this file as a SeWo, attach event handler

	navigator.serviceWorker.register(ownUrl).then(function(registration) {
		console.log('I registered myself', registration);

		var worker;
		if (registration.installing) {
			worker = registration.installing;
		} else if (registration.waiting) {
			worker = registration.waiting;
		} else if (registration.active) {
			worker = registration.active;
		}
		if (worker) {
			onWorkerState(worker);
			worker.addEventListener('statechange', function(e) {
				onWorkerState(e.target);
			});
		}

	}).catch(function(error) {
		console.error('Could not register myself:', error);
	});

}


else if (this.hasOwnProperty('ServiceWorkerGlobalScope')) {
	// When running as a SeWo:
	console.log('I\'m running as a service worker', this);


	// Receive 'registerTileLayer' worker messages
	// and add that URL as a RegExp of URLs to manage via SeWo cache.
	var tileRegExp = null;
	var tileRegExpTexts = [];

	this.addEventListener("message", function(ev) {

		if (this.clients && clients.claim) {
			console.log('Claiming clients', clients);
			clients.claim();
		}

		if (ev.data.type === 'registerTileLayer') {

			// Create a RegExp based on the URL
			var url = ev.data.url;
			var regExpText = '^' + ev.data.url
				.replace('{s}','.*')
				.replace('{x}','[0-9]+')
				.replace('{y}','[0-9]+')
				.replace('{z}','[0-9]+')
				.replace('{r}','(@2x)?')
				+ '$';

			// ev.source is a client object
			if (tileRegExpTexts.indexOf(regExpText) === -1) {
				tileRegExpTexts.push(regExpText);

				// ^((url1)|(url2)|(url3))$
				tileRegExp = new RegExp( '^((' + tileRegExpTexts.join(')|(') + '))$' );
			}
			console.log("Asked to register a new tile URL: ", ev.data, ", and now the tiles I must look for are: ", tileRegExpTexts, tileRegExp);

// 			fetch('https://a.basemaps.cartocdn.com/light_all/5/21/9.png').then(function(res){
// 				console.log('Fetched an internal tile', res, this);
// 			});
		}
	});


	// Intercept network requests to tiles
	self.addEventListener("fetch", function(ev) {
// 	this.addEventListener("fetch", function(ev) {
// 	this.onfetch = function(ev) {
// 		console.log('Worker fetch:', ev.request.url, ev);

		if (!tileRegExp) { return null; }

		if (ev.request.url.match(tileRegExp)) {
			console.log('Should cache the tile', ev.request.url);
		} else {
			console.log('Does not look like a tile', ev.request.url);
		}

// 	};
	});


	this.addEventListener('install', function(ev) {
		console.log('Worker installed', ev);

		ev.waitUntil(caches.open('leaflet-cached-tiles'));

		console.log('caches should be open', caches);

	});



}
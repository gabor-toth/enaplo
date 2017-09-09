//console.log('tabs.js');

// TODO make it configurable
const TABS_SOURCE_URL_PART = '/localhost:4200/';

(function() {
	const DEBUG_ACTION = 1;

	const DEBUG = DEBUG_ACTION;

	function unintercept(tabId) {
		if ( tabsIntercepted.hasOwnProperty(tabId) ) {
			if ( DEBUG & DEBUG_ACTION ) {
				console.log('Removing intercepted tab ' + tabId);
			}
			delete tabsIntercepted[ tabId ];
		}
	}

	function onRemovedCallback(tabId, removeInfo) {
		unintercept(tabId);
	}

	function shouldBeIntercepted(url) {
		return url.includes(TABS_SOURCE_URL_PART);
	}

	function checkAndIntercept(tabId, url) {
		if ( shouldBeIntercepted(url) ) {
			if ( DEBUG & DEBUG_ACTION ) {
				console.log('Intercepting tab ' + tabId);
			}
			tabsIntercepted[ tabId ] = true;
		} else {
			unintercept(tabId);
		}
	}

	function onUpdatedCallback(tabId, changeInfo, tab) {
		if ( changeInfo.url != null ) {
			checkAndIntercept(tabId, changeInfo.url);
		}
	}

	function queryCallback(tabs) {
		for ( let i in tabs ) {
			let tab = tabs[ i ];
			checkAndIntercept(tab.id, tab.url);
		}
	}

	chrome.tabs.query({}, queryCallback);
	chrome.tabs.onUpdated.addListener(onUpdatedCallback);
	chrome.tabs.onRemoved.addListener(onRemovedCallback);

})();

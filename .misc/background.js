"use strict";

/*
/*  Date: September 05, 2018 13:56:32
/*  Description: Basic implementation without a class
/*
*/

(function() {

	const URL_GOOGLE = "https://www.google.com";
	const URL_GOOGLE_NCR = URL_GOOGLE + "/ncr";

	browser.tabs.create({
		active: false,
		index: 0,
		pinned: true,
		url: URL_GOOGLE_NCR,
	}).then((createdTab) => {
		function onUpdated(tabId, changeInfo, updatedTab) {
			if(tabId === createdTab.id && updatedTab.status === "complete" && updatedTab.url.startsWith(URL_GOOGLE)) {
				browser.tabs.remove(tabId)
				browser.tabs.onUpdated.removeListener(onUpdated);
			}
		};
		browser.tabs.onUpdated.addListener(onUpdated);
	}).catch((error) => console.log("[Google NCR]", error) );

})();

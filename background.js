"use strict";

browser.tabs.create({
	active: false,
	index: 0,
	url:"https://www.google.com/ncr",
}).then((createdTab) => {
	function onUpdated(tabId, changeInfo, _tab) {
		if(tabId === createdTab.id && _tab.status === "complete") {
			browser.tabs.remove(tabId)
			browser.tabs.onUpdated.removeListener(onUpdated);
		}
	};
	browser.tabs.onUpdated.addListener(onUpdated);
});

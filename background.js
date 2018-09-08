"use strict";

function GNCRBackground() {

	const URL_GOOGLE = "https://www.google.com";
	const URL_GOOGLE_NCR = URL_GOOGLE + "/ncr";
	const TIMEOUT_DISPOSE_MILLISEC = 8000;

	browser.tabs.create({
		active: false,
		index: 0,
		pinned: true,
		url: URL_GOOGLE_NCR,
	}).then((createdTab) => {

		///////////////////////////////////////////////////////
		async function dispose(disposeTabId, timedout = false) {
			browser.tabs.remove(disposeTabId)
			browser.tabs.onUpdated.removeListener(onUpdated);
			if(timedout) {
				console.log("[Google NCR]", "dispose", "Timed out");
			}
		}

		///////////////////////////////////////////////////////
		function onUpdated(tabId, changeInfo, updatedTab) {
			if(tabId === createdTab.id && updatedTab.status === "complete" && updatedTab.url.startsWith(URL_GOOGLE)) {
				dispose(createdTab.id);
				clearTimeout(disposeTimer);
			}
		};

		console.log("[Google NCR]", "GNCRBackground Activated");

		browser.tabs.onUpdated.addListener(onUpdated);
		let disposeTimer = setTimeout(() => dispose(createdTab.id, true), TIMEOUT_DISPOSE_MILLISEC);

	}).catch((error) => {
		console.log("[Google NCR]", "Error:", error);
	}).finally(() => {
		browser.runtime.onStartup.removeListener(GNCRBackground);
	});
}

browser.runtime.onStartup.addListener(GNCRBackground);

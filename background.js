"use strict";

//////////////////////////////////////////////////////////////////////
async function GNCRBackground() {

	const URL_GOOGLE = "https://www.google.com";
	const URL_GOOGLE_NCR = URL_GOOGLE + "/ncr";

	let disposeTimeout = (await prefs.getDisposeTimeout()) * 1000;
	let showNotification = (await prefs.getShowNotificationOnSuccess());

	console.log("[Google NCR]", "GNCRBackground Activated");

	browser.tabs.create({
		active: false,
		index: 0,
		pinned: false,
		url: URL_GOOGLE_NCR,
	}).then((createdTab) => {

		browser.tabs.hide(createdTab.id);

		///////////////////////////////////////////////////////
		async function dispose(disposeTabId, timedout = false) {
			browser.tabs.remove(disposeTabId)
			browser.tabs.onUpdated.removeListener(onUpdated);
			if(timedout) {
				createNotification("The request for '" + URL_GOOGLE_NCR + "' has timed out.");
				console.log("[Google NCR]", "dispose", "Timed out");
			}
		}

		///////////////////////////////////////////////////////
		function onUpdated(tabId, changeInfo, updatedTab) {
			if(tabId === createdTab.id && updatedTab.status === "complete" && updatedTab.url.startsWith(URL_GOOGLE)) {
				if(updatedTab.title === "Google") {
					console.log("[Google NCR]", "Completed successfully");
					if(showNotification) {
						createNotification("Web request completed successfully.");
					}
				} else {
					createNotification("The web request may have failed. Unexpected page title.");
					console.log("[Google NCR]", "Unexpected page title");
				}
				dispose(createdTab.id);
				clearTimeout(disposeTimer);
			}
		};

		browser.tabs.onUpdated.addListener(onUpdated);
		let disposeTimer = setTimeout(() => dispose(createdTab.id, true), disposeTimeout);

	}).catch((error) => {
		console.log("[Google NCR]", "Error:", error);
	}).finally(() => {
		browser.runtime.onStartup.removeListener(GNCRBackground);
	});
}

//////////////////////////////////////////////////////////////////////
function delayedActivation() {
	prefs.getDelayedActivationTimeout().then((timeout) => {
		setTimeout(() => GNCRBackground(), (timeout*1000));
	});
}

//////////////////////////////////////////////////////////////////////
function createNotification(message, timeout = 4300) {

	let notifId = "GoogleNCR-" + window.btoa(message);

	// prevent displaying the same notification again and again
	browser.notifications.clear(notifId);

	browser.notifications.create(notifId, {
		type: "basic",
		title: "Google NCR - Web Extension",
		eventTime: Date.now(),					// no idea what it's good for
		message: message,
	});
	setTimeout(() => browser.notifications.clear(notifId), timeout);
}

browser.runtime.onStartup.addListener(delayedActivation);
browser.browserAction.onClicked.addListener(GNCRBackground);

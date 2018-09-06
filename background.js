"use strict";

class GNCRBackground {

	///////////////////////////////////////////////////////////////
	// C'tor
	constructor() {

		let gUrl = "https://www.google.com";

		this.const = Object.freeze({
			URL_GOOGLE: gUrl,
			URL_GOOGLE_NCR: gUrl + "/ncr",
			TIMEOUT_DISPOSE_MILLISEC: 5000,
		});
	}

	///////////////////////////////////////////////////////////////
	//
	static get i() {
		if(this.m_instance === undefined) {
			this.m_instance = new this();
		}
		return this.m_instance;
	}

	///////////////////////////////////////////////////////////////
	//
	run() {
		browser.tabs.create({
			active: false,
			index: 0,
			pinned: true,
			url: this.const.URL_GOOGLE_NCR,
		}).then((createdTab) => {

			///////////////////////////////////////////////////////
			async function dispose(disposeTabId, timedout = false) {
				browser.tabs.remove(disposeTabId)
				browser.tabs.onUpdated.removeListener(onUpdatedBound);
				if(timedout) {
					console.log("[Google NCR]", "Timed out");
				}
			}

			///////////////////////////////////////////////////////
			function onUpdated(tabId, changeInfo, updatedTab) {
				if(tabId === createdTab.id && updatedTab.status === "complete" && updatedTab.url.startsWith(this.const.URL_GOOGLE)) {
					dispose(createdTab.id);
					clearTimeout(disposeTimer);
				}
			};

			let onUpdatedBound = onUpdated.bind(this);
			browser.tabs.onUpdated.addListener(onUpdatedBound);
			let disposeTimer = setTimeout(() => dispose(createdTab.id, true), this.const.TIMEOUT_DISPOSE_MILLISEC);

		}).catch((error) => {
			console.log("[Google NCR]", error);
		});
	}
}

GNCRBackground.i.run();

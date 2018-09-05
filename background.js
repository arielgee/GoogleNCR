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

		let self = this;

		browser.tabs.create({
			active: false,
			index: 0,
			pinned: true,
			url: self.const.URL_GOOGLE_NCR,
		}).then((createdTab) => {

			///////////////////////////////////////////////////////
			async function dispose(disposeTabId, timedout = false) {
				browser.tabs.remove(disposeTabId)
				browser.tabs.onUpdated.removeListener(onUpdated);
				if(timedout) {
					console.log("[Google NCR]", "Timed out");
				}
			}

			///////////////////////////////////////////////////////
			function onUpdated(tabId, changeInfo, updatedTab) {
				if(tabId === createdTab.id && updatedTab.status === "complete" && updatedTab.url.startsWith(self.const.URL_GOOGLE)) {
					dispose(createdTab.id);
					clearTimeout(disposeTimer);
				}
			};

			browser.tabs.onUpdated.addListener(onUpdated);
			let disposeTimer = setTimeout(() => dispose(createdTab.id, true), self.const.TIMEOUT_DISPOSE_MILLISEC);

		}).catch((error) => {
			console.log("[Google NCR]", error);
		});
	}
}

GNCRBackground.i.run();

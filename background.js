chrome.browserAction.onClicked.addListener(function(tab) {
	// FIXME injecting js/css twice
	chrome.tabs.executeScript({ file: "seescope.js" });
	chrome.tabs.insertCSS({ file: "seescope.css" });
});

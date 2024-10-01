chrome.action.onClicked.addListener((currentTab) => {
    const options = {
        target: { tabId: currentTab.id },
        files: ['popup.js']
    };

    chrome.scripting.executeScript(options);
});
let color = '#aaaaaa';

chrome.runtime.onInstalled.addListener(
    () => {
        chrome.storage.sync.set({ color });
        console.log('URL detector started');
  }
  );

// Initialize button with user's preferred color
let urlContent = document.getElementById("buttonDiv");

chrome.storage.sync.get("color", ({ color }) => {
    urlContent.style.backgroundColor = color;
});

function findURLs() {
    let metaContents = document.getElementById("meta-contents");
    let urlList = [];
    if (metaContents) {
        let stringContents = metaContents.getElementsByClassName("yt-simple-endpoint style-scope yt-formatted-string");
        let contentLen = stringContents.length;
        for (i = 0; i < contentLen; i++) {
            urlList.push(stringContents[i].innerHTML);
        }
    }
    chrome.storage.sync.set({ urlList });
    //console.log(urlList);
};

let filteredURLs;

urlContent.addEventListener("click", async () => {
    //console.log("click");
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: findURLs,
    });

    chrome.storage.sync.get("urlList", ({ urlList }) => {
        //console.log(typeof urlList);
        filteredURLs = urlList.filter(word => {
            return word.includes("http") && !word.includes("youtu.be");
        });
        console.log(filteredURLs);
    });
});

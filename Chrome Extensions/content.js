//alert('Grrr.')
chrome.runtime.onMessage.addListener(function (request){
    alert(request)
})
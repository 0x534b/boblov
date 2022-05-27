/* THIS IS POPUP DOT JAY ESS */

// console.log(document);

let grabImg = document.getElementById("grabImg");

// console.log(grabImg);

grabImg.addEventListener("click",() => {    
    // Get active browser tab
    chrome.tabs.query({active: true}, function(tabs) {
        let tab = tabs[0];
        if (tab) {
            execScript(tab);
            // grabImages();
        } else {
            alert("There are no active tabs")
        }
    })
    // const tabId = getTabId();
    // execScript(tabId);
})

function execScript(tab) {
    // Execute a function on a page of the current browser tab
    // and process the result of execution
    chrome.scripting.executeScript(
        {
            target:{tabId: tab.id, allFrames: true},
            func:grabImages
        },
        onResult
    )
}

function onResult(frames) {
    // If script execution failed on remote end 
    // and could not return results
    if (!frames || !frames.length) { 
        alert("Could not retrieve images from specified page");
        return;
    }
    // Combine arrays of image URLs from 
    // each frame to a single array
    const imageUrls = frames.map(frame=>frame.result)
                            .reduce((r1,r2)=>r1.concat(r2));

    // Open a page with a list of images and send urls to it
    console.log(imageUrls[0]);
}


function grabImages() {
    console.log(document);
    const images = document.querySelectorAll("img[alt*=Page]");

    // ooga booga code
    // chrome.runtime.sendMessage({msg: 'image', index: 0}, function({data, index}){
    //     images[index].src = "https://raw.senmanga.com/img/logo.svg";
    // });

    images[0].src = "https://raw.senmanga.com/img/logo.svg";

    return Array.from(images).map(image=>image.src);
}
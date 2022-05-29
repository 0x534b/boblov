/* THIS IS POPUP DOT JAY ESS */

// boblov button
/*
const btn = document.getElementById('grabImg');

btn.addEventListener('click', function onClick() {
  btn.style.backgroundColor = 'salmon';
  btn.style.color = 'white';
});
*/

let grabImg = document.getElementById("grabImg");

grabImg.addEventListener("click", () => {
    // Get active browser tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        let tab = tabs[0];
        if (tab) {
            execScript(tab);
        } else {
            alert("There are no active tabs")
        }
    })
})

function execScript(tab) {
    // Execute a function on a page of the current browser tab
    // and process the result of execution
    chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true },
            func: grabImages
        } //,
        // onResult
    )
}


// get image from current tab (senmanga only)
function grabImages() {
    const images = document.querySelectorAll("img[alt*=Page]");

    // can change the image w smth like this
    // images[0].src = "REPLACE_URL";

    let frames = Array.from(images).map(image => image.src);

    // If script execution failed on remote end 
    // and could not return results
    if (!frames || !frames.length) {
        alert("Could not retrieve images from specified page");
        return;
    }


    // console.log(frames);

    // Combine arrays of image URLs from 
    // each frame to a single array
    // const imageUrls = frames.map(frame => frame.result)
    //     .reduce((r1, r2) => r1.concat(r2));

    // // Open a page with a list of images and send urls to it
    // console.log(imageUrls);

    // api call to translate and typeset
    let encode = encodeURIComponent(frames[0])

    let api_url = "http://localhost:8000/"

    fetch(`${api_url}?url=${encode}`)
        .then(res => res.blob()) // Gets the response and returns it as a blob
        .then(blob => {
            let objectURL = URL.createObjectURL(blob);
            images[0].src = objectURL;
            // console.log(objectURL);
        });

    // console.log(images[0].src);
}

// blob:https://raw.senmanga.com/958d51db-879d-4a43-90e4-eebb1f816364
// blob:https://raw.senmanga.com/a9608e1d-bffd-4974-a0f3-089ce1fd6e04
let submitButton =  document.getElementById("submit-button");

let generateGif = () => {
    //display loader until gif loads
    let loader = document.querySelector(".loader");
    loader.computedStyleMap.display = "block";
    document.querySelector(".wrapper").computedStyleMap.display = "none";

    // Get search value (default => laugh)
    let q = document.getElementById("search-box").value;

    let gifCount = 10;

    let finalURL= `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}
    &offset=0&rating=g&lang=en`;
    document.querySelector(".wrapper").innerHTML = "";

    //Make a call to API
    fetch(finalURL)
    .then(response => response.json())
    .then(info => {
        console.log(info.data)

        let gifsData = info.data;
        gifsData.forEach((gif) => {
            //ALL gifs
        let container = document.createElement("div");
        container.classList.add("container");
        let iframe = document.createElement("img");
        console.log(gif);
        iframe.setAttribute("src", gif.images.downsized_medium.url);
        iframe.onload = () => {
            // when iframes are loaded correctly reduce the count when each gif loads
            gifCount--;
        if(gifCount == 0) {
            // if all gifs are displayed then hide loader and display gifs UI
            loader.computedStyleMap.display = "none";
            document.querySelector(".wrapper").computedStyleMap.display = "grid";
        }
        };
        container.append(iframe);

        //Copy Link button

        let copyButton = document.createElement("button");
        copyButton.innerText = "Copy Link";
        copyButton.onclick = () => {
            let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4;`;
            // Copy text inside text field
            navigator.clipboard.writeText(copyLink)
            .then(()=>{
                alert("Gif copied to clipboard");
            })
        }

        document.querySelector(".wrapper").append(container);

        }).catch(() => {
            // IF navigator is not supported
            alert("Gif copied to clipboard");
            //Tempoary input
            let hiddenInput = document.createElement("input");
            hiddenInput.setAttribute("type", "text");
            document.body.appendChild(hiddenInput); 
            hiddenInput.value = copyLink;
            // select input
            hiddenInput.select();
            // copy the value
            document.execCommand("copy");
            // remove the input
            document.body.removeChild(hiddenInput);

        });
        
    });
    container.append(copyButton);
}

//Generate gifs when user clicks submit
submitButton.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);
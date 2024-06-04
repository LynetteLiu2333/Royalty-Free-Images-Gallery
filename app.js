let searchParameter = location.search.split("=").pop();

const access_key = "Rbcj7a_XCvD02CKeogyeCYS3ES2I2limJzo-6oNTFW8";
const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key}&count=30`;
const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key}&query=${searchParameter}&per_page=50`;
const gallery = document.querySelector(".gallery");

let currentImage = 0;
let allImages;

const downloadBtn = document.querySelector(".download-btn");
const closeBtn = document.querySelector(".close-btn");
const popUpImage = document.querySelector(".large-img");
const preBtn = document.querySelector(".previous-btn");
const nxtBtn = document.querySelector(".next-btn");

const getImages = () => {
    fetch(random_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data;
        displayImages(allImages);
    });
}

const searchImages = () => {
    fetch(search_photo_url)
    .then(res => res.json())
    .then(data => {
        allImages = data.results;
        displayImages(allImages);
    });
}

const displayImages = (data) => {
    // console.log(data); 
    data.forEach((item, index) => {
        // console.log(item); 
       let img = document.createElement("img");
       img.src = item.urls.regular;
       img.className = "gallery-img";
       gallery.appendChild(img);
       // pop-up image
       img.addEventListener("click", () => {
            currentImage = index;
            showPopup(item);
       })
    });
}

const showPopup = (item) => {
    let popUpContainer = document.querySelector(".image-pop-up");
    popUpContainer.classList.remove("hide"); // show pop-up window
    downloadBtn.href = item.links.html;
    popUpImage.src = item.urls.regular;

    closeBtn.addEventListener("click", () => {
        popUpContainer.classList.add("hide"); // hide/close pop-up window
    })
}

if (searchParameter === "") {
    getImages();
} else {
    searchImages();
}


preBtn.addEventListener("click", () => {
    if (currentImage > 0) {
        currentImage--;
        showPopup(allImages[currentImage]);
    }
})

nxtBtn.addEventListener("click", () => {
    if (currentImage < allImages.length) {
        currentImage++;
        showPopup(allImages[currentImage]);
    }
})

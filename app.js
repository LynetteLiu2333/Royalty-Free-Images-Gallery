// Extract search parameter from URL
const searchParameter = location.search.split("=").pop();

// Unsplash API access key and URLs
const access_key = "Rbcj7a_XCvD02CKeogyeCYS3ES2I2limJzo-6oNTFW8";
const base_url = "https://api.unsplash.com";
const random_photo_url = `${base_url}/photos/random?client_id=${access_key}&count=30`;
const search_photo_url = `${base_url}/search/photos?client_id=${access_key}&query=${searchParameter}&per_page=50`;

// DOM elements
const gallery = document.querySelector(".gallery");
const downloadBtn = document.querySelector(".download-btn");
const closeBtn = document.querySelector(".close-btn");
const popUpImage = document.querySelector(".large-img");
const preBtn = document.querySelector(".previous-btn");
const nxtBtn = document.querySelector(".next-btn");

// State variables
let currentImage = 0;
let allImages = [];

// Fetch images from the API
const fetchImages = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            allImages = searchParameter ? data.results : data;
            displayImages(allImages);
        })
        .catch(err => console.error("Error fetching images:", err));
};

// Display images in the gallery
const displayImages = (images) => {
    gallery.innerHTML = ""; // Clear the gallery
    images.forEach((image, index) => {
        const img = document.createElement("img");
        img.src = image.urls.regular;
        img.className = "gallery-img";
        img.addEventListener("click", () => {
            currentImage = index;
            showPopup(image);
        });
        gallery.appendChild(img);
    });
};

// Show the popup with a selected image
const showPopup = (image) => {
    const popUpContainer = document.querySelector(".image-pop-up");
    popUpContainer.classList.remove("hide"); // Show pop-up window
    downloadBtn.href = image.links.html;
    popUpImage.src = image.urls.regular;

    closeBtn.addEventListener("click", () => {
        popUpContainer.classList.add("hide"); // Hide/close pop-up window
    }, { once: true });
};

// Fetch and display images based on the search parameter
if (searchParameter) {
    fetchImages(search_photo_url);
} else {
    fetchImages(random_photo_url);
}

// Navigate to the previous image in the popup
preBtn.addEventListener("click", () => {
    if (currentImage > 0) {
        currentImage--;
        showPopup(allImages[currentImage]);
    }
});

// Navigate to the next image in the popup
nxtBtn.addEventListener("click", () => {
    if (currentImage < allImages.length - 1) {
        currentImage++;
        showPopup(allImages[currentImage]);
    }
});

const API_KEY = 'AIzaSyDuKQLyQPtZt6CSRDwUVwuxvbaubNRG5VM'; // Replace with your API key
const searchInput = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.ri-search-line');
const mainContainer = document.querySelector('.maincontainer');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchYouTube(query);
    }
});

async function searchYouTube(query) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=10&type=video&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.items);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayResults(videos) {
    mainContainer.innerHTML = ''; // Clear previous results

    videos.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.high.url;
        const channel = video.snippet.channelTitle;

        const videoCard = `
            <div class="card">
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <div class="thumbnailcontainer">
                        <img class="thumbnailimg" src="${thumbnail}" alt="Thumbnail">
                    </div>
                    <div class="detailscontainer">
                        <h2>${title}</h2>
                        <p>${channel}</p>
                    </div>
                </a>
            </div>
        `;
        mainContainer.innerHTML += videoCard;
    });
    // Select the search input field
    const searchInput = document.querySelector(".search-box input");

    // Function to handle search
    function handleSearch() {
        const query = searchInput.value.trim(); // Get input value
        if (query) {
            window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        }
    }

    // Add event listener for "keypress"
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    });

}
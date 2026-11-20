const searchBar = document.getElementById('search-bar');
const card = document.getElementById('card'); 
const searchButton = document.getElementById('search-button');

// Get the search bar information
searchBar.addEventListener('keyup', function() {
    const title = searchBar.value.toLowerCase();
});


// Collect information about the books
async function main() {

    let ;
    try {
        const response = await fetch('');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

    }

    
};
// endpoints: 

// Add text based on the book title 
// function addText() {
//     .innerHTML += `<p></p>`

// };

// Removes the text and replaces it with the new content when a new book is searched

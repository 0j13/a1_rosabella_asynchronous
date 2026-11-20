function addText(parent, tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    parent.append(element);
    return element;
}

// Define page elements
const searchBar = document.getElementById('search-bar');
const card = document.getElementById('card'); 
const status = document.getElementById('status');



searchBar.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Retrieve user input
    const userInput = document.getElementById('search-bar').value;
    const titleText = userInput.toLowerCase().split(" ").join("+");

    // Create a URL using the user input
    const url = `https://openlibrary.org/search.json?q=${titleText}&limit=15&lang=en`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const bookTitles = await response.json();

        if (bookTitles.docs.length === 0) {
            status.textContent = 'No books found';
            return;
        }

        
    }
})

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

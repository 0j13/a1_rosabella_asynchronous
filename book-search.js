function addText(parent, tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    parent.append(element);
    return element;
}

// Define page elements
const search = document.getElementById('searchWrapper');
const card = document.getElementById('card'); 
const status = document.getElementById('status');


// EventListener that runs when 'Search' is clicked
search.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Retrieve user input
    const userInput = document.getElementById('search-bar').value;
    const titleText = userInput.toLowerCase().split(" ").join("+");

    if (!titleText) return;

    // Shows status while content is being pulled
    cards.replaceChildren();
    status.textContent = 'Loading...';

    // Create a URL using the user input
    const url = `https://openlibrary.org/search.json?q=${titleText}&limit=15&lang=en`;

    try {
        const response = await fetch(url);

        // Runs if an error is found
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const bookTitles = await response.json();

        // Runs if no books are found
        if (bookTitles.docs.length === 0) {
            status.textContent = 'No books found';
            return;
        }

        // Runs a for loop to add content to each book
        for (const book of bookTitles.docs) {
            // Creates an article element
            const content = document.createElement('article');
            content.classList.add('content');

            // Define variables
            const title = book.title;
            const authorName = book.author_name;
            const coverId = book.cover_i;
            const publishYear = book.first_publish_year;

            // Book title
            addLine(content, 'h2', title);
            // Author name
            addLine(content, 'p', `Author: ${authorName}`);
            // Date published
            addLine(content, 'p', `Publish date: ${publishYear}`);

            // Add image
            const image = document.createElement('img');
            image.src = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
            image.alt = `Book cover of ${title}`;
            content.append(image);

            // Adds content to each card
            cards.append(content);
        }

    } catch (error) {
        console.error('Book search failed:', error);
        status.textContent = 'Could not load any books. Try again';
    }
    
})
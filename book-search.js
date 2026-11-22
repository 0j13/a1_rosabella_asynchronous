// Adds content to a card
function addText(parent, tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    parent.append(element);
    return element;
}

// Define page elements
const search = document.getElementById('searchWrapper');
const cards = document.getElementById('card'); 
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
            const title = book.title ?? 'Untitled';
            const authorName = book.author_name?.join(', ') ?? 'Unknown';
            const coverId = book.cover_i;
            const publishYear = book.first_publish_year ?? 'Unknown';

            // Creates a div element
            const div = document.createElement('div');
            content.append(div);

            // Add image
            if (book.cover_i) {
                const image = document.createElement('img');
                image.src = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
                image.alt = `Book cover of ${title}`;
                div.append(image)
            }

            // Creates a section  element
            const section = document.createElement('section');
            div.append(section);

            // Book title
            addText(section, 'h2', title);
            // Author name
            addText(section, 'p', `Author: ${authorName}`);
            // Date published
            addText(section, 'p', `Publish date: ${publishYear}`);
            // Separator
            addText(content, 'hr', " ");

            // Adds content to each card
            cards.append(content);
        }

    // Error if the search failed
    } catch (error) {
        console.error('Book search failed:', error);
        status.textContent = 'Could not load any books. Try again';
    }
    
})
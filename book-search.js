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

        for (const book of bookTitles.docs) {

            const content = document.createElement('article');
            content.classList.add('content');

            const title = book.title;
            const authorName = book.author_name;
            const coverId = book.cover_i;
            const publishYear = book.first_publish_year;

            addLine(content, 'h2', title);
            addLine(content, 'p', `Author: ${authorName}`);
            addLine(content, 'p', `Publish date: ${publishYear}`);

            const image = document.createElement('img');
            image.src = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
            image.alt = `Book cover of ${title}`;
            content.append(image);

            cards.append(content);
        }
    } catch (error) {
        console.error('Book search failed:', error);
        status.textContent = 'Could not load any books. Try again';
    }
    
})
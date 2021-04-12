const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes = [];

// show that we are loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuotes() {
    loading();
    // to get a random number, we combine maths random and math floor(to return an int)
    // pick a random quote from API QUOTE ARRAY
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with 'Unknown

    if (!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }
    // Check the length to determine the styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set quote, hide loader

    quoteText.textContent = quote.text;
    complete();
}


// Get quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuotes();
    } catch (e) {
        // catch error here
        alert(e);
    }
}

// Tweet a quote

function tweetQuote() {
    const twitterUrl = `
    https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}
    `;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuotes)
twitterBtn.addEventListener('click', tweetQuote)
    // On Load
getQuotes();

// If we use a local method, we can use ==> 

// function newQuotes() {
//     // to get a random number, we combine maths random and math floor(to return an int)
//     // pick a random quote from API QUOTE ARRAY
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }
// newQuotes();
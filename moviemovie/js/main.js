document.getElementById('searchBtn').addEventListener('click', function() {
    let movieName = document.getElementById('movieSearch').value;
    let movieInfoDiv = document.getElementById('movieInfo');
    
    if (movieName.trim() === '') {
        movieInfoDiv.innerHTML = 'Please enter a movie name to search.';
        return;
    }
    
    movieInfoDiv.innerHTML = 'Searching...';

    // Make sure to encode the movie name to handle special characters
    let encodedMovieName = encodeURIComponent(movieName);

    fetch(`https://search.imdbot.workers.dev/?q=${encodedMovieName}`)
        .then(response => response.json())
        .then(data => {
            // Assuming the data contains an array of movies
            if (data && data.length > 0) {
                const firstMovie = data[0]; // Just as an example, taking the first movie
                movieInfoDiv.innerHTML = `Title: ${firstMovie.title}<br>`
                                       + `Year: ${firstMovie.year}<br>`
                                       + `IMDb ID: ${firstMovie.imdb_id}<br>`;
            } else {
                movieInfoDiv.innerHTML = 'No movies found. Please try a different search.';
            }
        })
        .catch(error => {
            movieInfoDiv.innerHTML = 'Sorry, there was an error with your search.';
            console.error('Error:', error);
        });
});

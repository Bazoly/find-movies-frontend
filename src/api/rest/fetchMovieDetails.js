const wikipediaApi = `https://en.wikipedia.org/w/api.php?`;
const searchMovieQuery = `&origin=*&format=json&action=query&list=search&srsearch=`

async function searchMovie(movieTitle) {
    try {
        const response = await fetch(wikipediaApi + searchMovieQuery + movieTitle);
        return await response.json();
    } catch (e) {
        console.log(e);
    }
}




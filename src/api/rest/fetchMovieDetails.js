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

export async function getMoviePageId(movieTitle) {
    const searchResult = await searchMovie(movieTitle);
    const moviePageId = searchResult;
    return moviePageId.query.search[0].pageid;
}


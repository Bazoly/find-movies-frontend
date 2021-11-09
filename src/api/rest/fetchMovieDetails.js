const WIKIPEDIA_API = `https://en.wikipedia.org/w/api.php?`;
const SEARCH_MOVIE_QUERY = `&origin=*&format=json&action=query&list=search&srsearch=`
const FIRST_RESULT_INDEX = 0;

export default async function searchMovie(movieTitle) {
    try {
        const response = await fetch(WIKIPEDIA_API + SEARCH_MOVIE_QUERY + movieTitle);
        return getMoviePageId(await response.json());
    } catch (e) {
        console.log(e);
    }
}

function getMoviePageId(movieList) {
    return movieList.query.search[FIRST_RESULT_INDEX].pageid;
}


const WIKIPEDIA_API = `https://en.wikipedia.org/w/api.php?`;
const SEARCH_MOVIE_QUERY = `&origin=*&format=json&action=query&list=search&srsearch=`
const GET_MOVIE_BY_PAGE_ID = `&origin=*&format=json&action=query&prop=categories|extracts&exintro&explaintext&redirects=1&pageids=`
const FIRST_RESULT_INDEX = 0;

async function searchMovie(movieTitle) {
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

export default async function getMovieFirstParagraph(movieTitle) {
    const pageId = await searchMovie(movieTitle);
    try {
        const response = await fetch(WIKIPEDIA_API + GET_MOVIE_BY_PAGE_ID + pageId);
        const movie = await response.json();
        return movie.query.pages[pageId];
    } catch (e) {
        console.log(e);
    }

}




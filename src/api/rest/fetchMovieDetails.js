const WIKIPEDIA_API = `https://en.wikipedia.org/w/api.php?`;
const SEARCH_MOVIE_QUERY = `&origin=*&format=json&action=query&list=search&srsearch=`
const GET_MOVIE_BY_PAGE_ID = `&origin=*&format=json&action=query&prop=extracts|info&inprop=url&exintro&explaintext&redirects=1&pageids=`
const GET_ALL_LINK_BY_PAGE_ID = `&origin=*&format=json&action=query&prop=extlinks&ellimit=500&redirects=1&pageids=`
const FIRST_RESULT_INDEX = 0;

async function apiGet(url, parameter) {
    const response = await fetch(url + parameter);
    return await response.json();
}

async function searchMovieWikipediaPageId(movieTitle) {
    try {
        const movieList = await apiGet(SEARCH_MOVIE_QUERY, movieTitle);
        return getMoviePageId(movieList);
    } catch (e) {
        console.log(e);
    }
}

function getMoviePageId(movieList) {
    return movieList.query.search[FIRST_RESULT_INDEX].pageid;
}

async function getAllLinksByPageId(pageId) {
    try {
        const links = await apiGet(GET_ALL_LINK_BY_PAGE_ID, pageId);
        return links.query.pages[pageId];
    } catch (e) {
        console.log(e);
    }
}

export default async function getMovieFirstParagraph(movieTitle) {
    const pageId = await searchMovieWikipediaPageId(movieTitle);
    try {
        const movie = await apiGet(GET_MOVIE_BY_PAGE_ID, pageId);
        return movie.query.pages[pageId];
    } catch (e) {
        console.log(e);
    }

}




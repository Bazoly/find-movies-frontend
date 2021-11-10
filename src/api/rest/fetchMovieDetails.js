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
        const movieList = await apiGet(WIKIPEDIA_API + SEARCH_MOVIE_QUERY, movieTitle);
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
        const links = await apiGet(WIKIPEDIA_API + GET_ALL_LINK_BY_PAGE_ID, pageId);
        return links.query.pages[pageId];
    } catch (e) {
        console.log(e);
    }
}

function getImdbLink(links) {
    const imdbRegexp = /https:\/\/www\.imdb\.com\/title\/.*/;
    const imdbLinkObject = {imdbLink: "#"};

    const linksArray = links?.extlinks;
    if (linksArray !== undefined) {
        for (const linksArrayElement of linksArray) {
            if (imdbRegexp.test(linksArrayElement["*"])) {
                imdbLinkObject.imdbLink = linksArrayElement["*"];
                return imdbLinkObject
            }
        }
    }
    return imdbLinkObject;
}

export default async function getMovieFirstParagraph(movieTitle) {
    const pageId = await searchMovieWikipediaPageId(movieTitle);
    const links = await getAllLinksByPageId(pageId);
    const imdbLink = getImdbLink(links);
    try {
        const movie = await apiGet(WIKIPEDIA_API + GET_MOVIE_BY_PAGE_ID, pageId);
        const movieDetails = movie.query.pages[pageId];
        return Object.assign(movieDetails, imdbLink);
    } catch (e) {
        console.log(e);
    }

}




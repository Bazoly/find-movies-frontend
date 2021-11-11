const WIKIPEDIA_API = `https://en.wikipedia.org/w/api.php?`;
const SEARCH_MOVIE_QUERY = `&origin=*&format=json&action=query&list=search&srsearch=`
const GET_MOVIE_BY_PAGE_ID = `&origin=*&format=json&action=query&prop=extracts|info&inprop=url&exintro&explaintext&redirects=1&pageids=`
const GET_ALL_LINK_BY_PAGE_ID = `&origin=*&format=json&action=query&prop=extlinks&ellimit=500&redirects=1&pageids=`

async function apiGet(url, parameter) {
    const response = await fetch(url + parameter);
    if (response.status >= 200 && response.status <= 299) {
        return await response.json();
    } else {
        throw new Error(response.statusText);
    }

}

async function searchMovieWikipediaPageId(movieTitle, movieReleaseDate) {
    try {
        const movieList = await apiGet(WIKIPEDIA_API + SEARCH_MOVIE_QUERY, movieTitle + " " + movieReleaseDate);
        return getMoviePageId(movieList, movieTitle, movieReleaseDate);
    } catch (e) {
        console.error(e);
    }
}

function getMoviePageId(movieList, movieTitle, movieReleaseDate) {
    const movieRegexp = new RegExp(movieTitle + "?\\s*(.*?)\\s*(?:" + movieReleaseDate + "?:\\s*(.*))?$");
    for (const movieListElement of movieList.query.search) {
        if (movieRegexp.test(movieListElement.title)) {
            return movieListElement.pageid;
        }
    }
    throw new Error("Movie not found!")
}

async function getAllLinksByPageId(pageId) {
    try {
        const links = await apiGet(WIKIPEDIA_API + GET_ALL_LINK_BY_PAGE_ID, pageId);
        return links.query.pages[pageId];
    } catch (e) {
        console.error(e);
    }
}

function getImdbLink(links) {
    const imdbRegexp = /https:\/\/www\.imdb\.com\/title\/.*/;
    const imdbLinkObject = {imdbLink: null};

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

export default async function getMovieFirstParagraph(movieTitle, movieReleaseDate) {
    const pageId = await searchMovieWikipediaPageId(movieTitle, movieReleaseDate);
    const links = await getAllLinksByPageId(pageId);
    const imdbLink = getImdbLink(links);
    try {
        const movie = await apiGet(WIKIPEDIA_API + GET_MOVIE_BY_PAGE_ID, pageId);
        const movieDetails = movie.query.pages[pageId];
        return Object.assign(movieDetails, imdbLink);
    } catch (e) {
        console.error(e);
    }

}




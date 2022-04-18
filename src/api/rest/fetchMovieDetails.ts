const WIKIPEDIA_API = `https://en.wikipedia.org/w/api.php?`;
const SEARCH_MOVIE_QUERY = `&origin=*&format=json&action=query&list=search&srsearch=`
const GET_MOVIE_BY_PAGE_ID = `&origin=*&format=json&action=query&prop=extracts|info&inprop=url&exintro&explaintext&redirects=1&pageids=`
const GET_ALL_LINK_BY_PAGE_ID = `&origin=*&format=json&action=query&prop=extlinks&ellimit=500&redirects=1&pageids=`

interface SearchMovieByNameResult {
    query: {
        search: MovieByTitle[]
    }
}

interface MovieByTitle {
    title: string;
    pageid: number
}

interface SearchMovieByPageIdResult {
    query: {
        pages: {
            [pageid: string]: MovieByPageId
        }
    }
}

interface MovieByPageId{
    title: string
    extract: string
    canonicalurl: string
}

interface MovieLinksResult{
    query: {
        pages: {
            [pageid: string]: MovieLinks
        }
    }
}

interface MovieLinks {
    extlinks: {"*": string}[]
}

interface ImdbLink {
    imdbLink: string
}

export interface MovieDetailedView extends MovieByPageId, ImdbLink{}


async function apiGet<T>(url: string, parameter: string): Promise<T> {
    const response = await fetch(url + parameter);
    if (response.status >= 200 && response.status <= 299) {
        return await response.json();
    } else {
        throw new Error(response.statusText);
    }

}

async function searchMovieWikipediaPageId(movieTitle: string, movieReleaseDate: string): Promise<string> {
    try {
        const movieList: SearchMovieByNameResult = await apiGet(WIKIPEDIA_API + SEARCH_MOVIE_QUERY, movieTitle + " " + movieReleaseDate);
        return getMoviePageId(movieList, movieTitle, movieReleaseDate);
    } catch (e) {
        console.error(e);
        throw new Error(movieTitle + " " + movieReleaseDate + "not found!");
    }
}

function getMoviePageId(movieList: SearchMovieByNameResult, movieTitle: string, movieReleaseDate: string): string {
    const movieRegexp = new RegExp(movieTitle + "?\\s*(.*?)\\s*(?:" + movieReleaseDate + "?:\\s*(.*))?$");
    for (const movieListElement of movieList.query.search) {
        if (movieRegexp.test(movieListElement.title)) {
            return movieListElement.pageid.toString();
        }
    }
    throw new Error("Movie not found!")
}

async function getAllLinksByPageId(pageId: string): Promise<MovieLinks> {
    try {
        const links: MovieLinksResult = await apiGet(WIKIPEDIA_API + GET_ALL_LINK_BY_PAGE_ID, pageId);
        return links.query.pages[pageId];
    } catch (e) {
        console.error(e);
        throw new Error("Movie not found!");
    }
}

function getImdbLink(links: MovieLinks): ImdbLink {
    const imdbRegexp = /https:\/\/www\.imdb\.com\/title\/.*/;
    const imdbLinkObject: ImdbLink = {imdbLink: ""};

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

export default async function getMovieFirstParagraph(movieTitle: string, movieReleaseDate: string): Promise<MovieDetailedView | undefined> {
    const pageId = await searchMovieWikipediaPageId(movieTitle, movieReleaseDate);
    const links = await getAllLinksByPageId(pageId);
    const imdbLink = getImdbLink(links);
    try {
        const movie: SearchMovieByPageIdResult = await apiGet(WIKIPEDIA_API + GET_MOVIE_BY_PAGE_ID, pageId);
        const movieDetails = movie.query.pages[pageId];
        return Object.assign(movieDetails, imdbLink);
    } catch (e) {
        console.error(e);
    }

}




const wikipediaApi = `https://en.wikipedia.org/w/api.php?`;
const searchMovieQuery = `&origin=*&format=json&action=query&list=search&srsearch=`
const FIRST_RESULT_INDEX = 0;

export default async function searchMovie(movieTitle) {
    try {
        const response = await fetch(wikipediaApi + searchMovieQuery + movieTitle);
        return getMoviePageId(await response.json());
    } catch (e) {
        console.log(e);
    }
}

function getMoviePageId(movieList) {
    return movieList.query.search[FIRST_RESULT_INDEX].pageid;
}


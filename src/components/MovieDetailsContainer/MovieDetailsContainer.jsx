import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import getMovieFirstParagraph from "../../api/rest/fetchMovieDetails";
import {CircularProgress} from "@mui/material";

export default function MovieDetailsContainer() {
    const {movieSearchParams} = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getMovieFirstParagraph(movieSearchParams);
            setMovieDetails(data);
            setLoading(false);
        }

        fetchData()
    }, [movieSearchParams]);

    if (loading) return <CircularProgress/>
    if (movieDetails === undefined) return <h2>Movie not found!</h2>
    return (
        <div>
            <h2>{movieDetails.title}</h2>
            <p>{movieDetails.extract}</p>
            <a title={"Wikipedia: " + movieDetails.title} href={movieDetails.canonicalurl} target={"_blank"}>
                <img height="50" alt="Wikipedia&#039;s W" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Wikipedia%27s_W.svg/128px-Wikipedia%27s_W.svg.png"/>
            </a>
            <a title={"IMDB: " + movieDetails.title} href={movieDetails.imdbLink} target={"_blank"}>
                <img height="50" alt="IMDB Logo 2016" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/512px-IMDB_Logo_2016.svg.png"/>
            </a>
        </div>


    );
}
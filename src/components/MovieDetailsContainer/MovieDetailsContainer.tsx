import {useParams} from "react-router-dom";
import React, {useEffect, useState, ReactElement} from "react";
import getMovieFirstParagraph, {MovieDetailedView}  from "../../api/rest/fetchMovieDetails";
import {Card, CardActions, CardContent, CardHeader, CircularProgress, IconButton} from "@mui/material";

export default function MovieDetailsContainer(): ReactElement {
    const {movieTitle} = useParams();
    const {movieReleaseDate} = useParams();
    const [movieDetails, setMovieDetails] = useState<MovieDetailedView | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!movieTitle || !movieReleaseDate) throw new Error("No movie title or release date");
            const data = await getMovieFirstParagraph(movieTitle, movieReleaseDate);
            if (!data) throw new Error("No data");
            setMovieDetails(data);
            setLoading(false);
        }

        fetchData()
            .catch((e) => {
                console.error(e);
            })
    }, [movieTitle, movieReleaseDate]);

    if (loading) return <CircularProgress/>;
    if (!movieDetails) return <h1>Movie not found!</h1>;
    if (movieDetails.imdbLink === null) return (
        <Card elevation={3}>
            <CardHeader title={movieDetails.title}/>
            <CardContent>{movieDetails.extract}</CardContent>
            <CardActions>
                <IconButton title={"Wikipedia: " + movieDetails.title} href={movieDetails.canonicalurl}
                            target={"_blank"} rel={"noreferrer"}>
                    <img height="25" alt="Wikipedia&#039;s W"
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Wikipedia%27s_W.svg/128px-Wikipedia%27s_W.svg.png"/>
                </IconButton>
            </CardActions>
        </Card>
    );

    return (
        <Card elevation={3}>
            <CardHeader title={movieDetails.title}/>
            <CardContent>{movieDetails.extract}</CardContent>
            <CardActions>
                <IconButton title={"Wikipedia: " + movieDetails.title} href={movieDetails.canonicalurl}
                            target={"_blank"} rel={"noreferrer"}>
                    <img height="25" alt="Wikipedia&#039;s W"
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Wikipedia%27s_W.svg/128px-Wikipedia%27s_W.svg.png"/>
                </IconButton>
                <IconButton title={"IMDB: " + movieDetails.title} href={movieDetails.imdbLink} target={"_blank"}
                            rel={"noreferrer"}>
                    <img height="25" alt="IMDB Logo 2016"
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/512px-IMDB_Logo_2016.svg.png"/>
                </IconButton>
            </CardActions>
        </Card>
    );
}
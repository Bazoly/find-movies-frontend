import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import getMovieFirstParagraph from "../../api/rest/fetchMovieDetails";
import {Card, CardActions, CardContent, CardHeader, CircularProgress, IconButton} from "@mui/material";

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
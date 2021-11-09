import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import getMovieFirstParagraph from "../../api/rest/fetchMovieDetails";
import {CircularProgress} from "@mui/material";

export default function MovieDetailsContainer() {
    const {movieTitle} = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getMovieFirstParagraph(movieTitle);
            setLoading(false)
            setMovieDetails(data);
        }

        fetchData()
    }, [movieTitle]);

    if (loading) return <CircularProgress/>
    return (
        <div>
            <h2>{movieDetails.title}</h2>
            <p>{movieDetails.extract}</p>
        </div>


    );
}
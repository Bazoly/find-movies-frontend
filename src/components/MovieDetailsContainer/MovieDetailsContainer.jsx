import {useParams} from "react-router-dom";

export default function MovieDetailsContainer () {
    const {movieTitle} = useParams();

    return (
        <h2>{movieTitle}</h2>
    );
}
import React, {ReactElement} from "react";
import {Card, CardContent, CardHeader} from "@mui/material";
import {Link} from "react-router-dom";
import "./ListElement.css"
import {Movie} from "../ListContainer/ListContainer";

export default function ListElement({movie}: {movie: Movie}): ReactElement {
    let releaseDate = null;

    if (movie.releaseDate !== null) {
        releaseDate = new Date(movie.releaseDate);
    }

    return (
        <Card key={movie.id} sx={{m: 1}} elevation={3}>
            <CardHeader title={
                <Link
                    to={`/movie/${movie.name}/${releaseDate?.getFullYear()}`}>
                    {movie.name}
                </Link>
            }>
            </CardHeader>
            <CardContent>
                <p>Release date: {releaseDate?.toLocaleDateString()}</p>
                <p>Score: {movie.score}</p>
                <p>Genre: {movie.genres.map((genre, i) => movie.genres.length === i + 1 ? genre.name : genre.name + ", ")}</p>
            </CardContent>
        </Card>
    )
}

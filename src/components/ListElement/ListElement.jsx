import {Card, CardContent, CardHeader} from "@mui/material";
import {Link} from "react-router-dom";
import "./ListElement.css"

export default function ListElement({movie}) {
    let releaseDate = null;

    if (movie.releaseDate !== null) {
        releaseDate = new Date(movie.releaseDate);
    }

    return (
        <Card key={movie.id} sx={{m: 1}} elevation={3}>
            <CardHeader title={
                <Link
                    to={`/movie/${movie.name} ${releaseDate?.getFullYear()} ${movie.cast[FIRST_CAST_MEMBER_INDEX]?.person.name}`}>
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
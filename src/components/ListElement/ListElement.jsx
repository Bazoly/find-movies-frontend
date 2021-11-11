import {Link} from "react-router-dom";
import "./ListElement.css"

export default function ListElement({movie}) {
    const FIRST_CAST_MEMBER_INDEX = 0;
    let releaseDate = null;

    if (movie.releaseDate !== null) {
        releaseDate = new Date(movie.releaseDate);
    }

    return (
        <div key={movie.id}>
            <h3>
                <Link to={`/movie/${movie.name} ${releaseDate?.getFullYear()} ${movie.cast[FIRST_CAST_MEMBER_INDEX]?.person.name}`}>
                    {movie.name}
                </Link>
            </h3>
            <p>Release date: {releaseDate?.toLocaleDateString()}</p>
            <p>Score: {movie.score}</p>
            <p>Genre: {movie.genres.map((genre) => genre.name + " ")}</p>
        </div>
    )
}
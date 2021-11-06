export default function ListElement({movie}) {
    function convertReleaseDate(releaseDate) {
        if (releaseDate === null) {
            return null;
        }
        return new Date(releaseDate);
    }

    return (
        <div key={movie?.id}>
            <h3>{movie?.name}</h3>
            <p>Release date: {convertReleaseDate(movie?.releaseDate)?.toLocaleDateString()}</p>
            <p>Score: {movie?.score}</p>
            <p>Genre: {movie?.genres.map((genre) => genre.name + " ")}</p>
        </div>
    )
}
import {Button, InputBase} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {SEARCH_MOVIES_BY_TITLE} from "../../api/graphql/queries";
import ListElement from "../ListElement/ListElement";


export default function Search() {
    const [searchedMovie, setSearchedMovie] = useState("");
    const {error, loading, data} = useQuery(SEARCH_MOVIES_BY_TITLE, {
        variables: {title: searchedMovie},
    });

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (data) {
            setMovies(data.searchMovies)
        }
    }, [data]);


    return (
        <>
            <InputBase placeholder={"Search movie"} onChange={event => setSearchedMovie(event.target.value)}/>
            <Button variant={"contained"} onClick={() => console.log(searchedMovie)}>Search</Button>
            <div>
                {movies.map((movie) => {
                    return <ListElement movie={movie}/>
                })}
            </div>
        </>

    );
}

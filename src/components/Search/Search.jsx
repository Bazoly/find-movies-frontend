import {Button, FormControl, TextField} from "@mui/material";
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
            <form onSubmit={handleSubmit}>
                <label>
                    Movie title:
                    <input placeholder={"Search movie"} name={"title"} onChange={event => setSearchedMovie(event.target.value)}/>
                </label>
                <button type={"submit"}>Search</button>
            </form>
        </>

    );
}

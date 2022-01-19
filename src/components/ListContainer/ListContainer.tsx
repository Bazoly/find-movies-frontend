import React, {ReactElement} from "react";
import ListElement from "../ListElement/ListElement";
import {useQuery} from "@apollo/client";
import {SEARCH_MOVIES_BY_TITLE} from "../../api/graphql/queries";
import {useSearchParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";

export interface Movie {
    id: number;
    name: string;
    releaseDate: string;
    genres: Genre[];
    score: number
}

interface Genre {
    name: string
}

export default function ListContainer(): ReactElement {
    const [searchParams, setSearchParams] = useSearchParams();
    const {error, loading, data} = useQuery(SEARCH_MOVIES_BY_TITLE, {
        variables: {title: searchParams.get("movie")},
    });

    if (loading) return <CircularProgress/>;
    if (error) return <p>`Error: ${error.message}`</p>
    return (
        <div>
            {data.searchMovies.map((movie: Movie) => {
                return <ListElement key={movie.id} movie={movie}/>
            })}
        </div>
    )
}

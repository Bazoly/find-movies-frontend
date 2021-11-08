import {Button, FormControl, TextField} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {SEARCH_MOVIES_BY_TITLE} from "../../api/graphql/queries";
import ListElement from "../ListElement/ListElement";
import {Navigate, useNavigate} from "react-router-dom";


export default function Search() {
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const formDate = new FormData(event.currentTarget);
        if (!formDate.get("title")) {
            return;
        }
        navigate(`/search?title=${formDate.get("title")}`);

    }


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

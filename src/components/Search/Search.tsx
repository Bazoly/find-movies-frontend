import React, {FormEvent, ReactElement} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import "./Search.css"


export default function Search(): ReactElement {
    const {movieSearchParams} = useParams();
    const navigate = useNavigate();

    function handleSubmit(event: FormEvent): void {
        event.preventDefault();
        let formData = event.target as typeof event.target & {
            title: {value: string}
        };
        if (!formData.title) {
            return;
        }
        navigate(`/search?movie=${formData.title.value}`);

    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField name={"title"}
                           placeholder={"Search movie"}
                           value={movieSearchParams}
                           variant={"outlined"}
                           fullWidth={true}
                           margin={"normal"}/>
                <Button type={"submit"}
                        variant={"contained"}
                        color={"primary"}>
                    Search
                </Button>
            </form>
        </>

    );
}

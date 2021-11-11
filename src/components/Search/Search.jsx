import {useNavigate, useParams} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import "./Search.css"


export default function Search() {
    const {movieSearchParams} = useParams();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const formDate = new FormData(event.currentTarget);
        if (!formDate.get("title")) {
            return;
        }
        navigate(`/search?movie=${formDate.get("title")}`);

    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField name={"title"} placeholder={"Search movie"} value={movieSearchParams} variant={"outlined"} fullWidth={true} margin={"normal"}/>
                <Button type={"submit"} variant={"contained"} color={"primary"}>Search</Button>
            </form>
        </>

    );
}

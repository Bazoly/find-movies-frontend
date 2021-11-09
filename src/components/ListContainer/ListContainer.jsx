import ListElement from "../ListElement/ListElement";
import {useQuery} from "@apollo/client";
import {SEARCH_MOVIES_BY_TITLE} from "../../api/graphql/queries";
import {useSearchParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";

export default function ListContainer() {
    const [searchParams, setSearchParams] = useSearchParams();
    const {error, loading, data} = useQuery(SEARCH_MOVIES_BY_TITLE, {
        variables: {title: searchParams.get("title")},
    });

    if (loading) return <CircularProgress/>;
    if (error) return `Error: ${error.message}`
    return (
        <div>
            {data.searchMovies.map((movie) => {
                return <ListElement key={movie.id} movie={movie}/>
            })}
        </div>
    )
}
import ListElement from "../ListElement/ListElement";
import {useQuery} from "@apollo/client";
import {SEARCH_MOVIES_BY_TITLE} from "../../api/graphql/queries";
import {useEffect} from "react";

export default function ListContainer(props) {
    const {error, loading, data} = useQuery(SEARCH_MOVIES_BY_TITLE, {
        variables: {title: searchedMovie},
    });

    useEffect(() => {
        if (data) {
            setMovies(data.searchMovies)
        }
    }, [data]);

    return(
        <div>
            {movies.map((movie) => {
                return <ListElement movie={movie}/>
            })}
        </div>
    )
}
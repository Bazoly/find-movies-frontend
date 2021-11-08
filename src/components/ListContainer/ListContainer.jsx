import ListElement from "../ListElement/ListElement";
import {useQuery} from "@apollo/client";
import {SEARCH_MOVIES_BY_TITLE} from "../../api/graphql/queries";
import {useSearchParams} from "react-router-dom";

export default function ListContainer() {
    const [searchParams, setSearchParams] = useSearchParams();
    const {error, loading, data} = useQuery(SEARCH_MOVIES_BY_TITLE, {
        variables: {title: searchParams.get("title")},
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
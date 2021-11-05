import {gql} from "@apollo/client";

export const SEARCH_MOVIES_BY_TITLE = gql`
  query SearchMovies($title: String!){
    searchMovies(query: $title) {
        id
        name
        genres {
            name
        }
        score
  }
}
`
import './App.css';
import {AppBar} from "@mui/material";
import Search from "./components/Search/Search";
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from "@apollo/client";
import {onError} from "@apollo/client/link/error";

const errorLink = onError(({graphqlErrors, networkError}) => {
    if (graphqlErrors) {
        graphqlErrors.map(({message, location, path}) => {
            console.log(`Graphql error ${message} ${location} ${path}`)
        })
    }
});

const link = from([
    errorLink,
    new HttpLink({uri: "https://tmdb.sandbox.zoosh.ie/dev/graphql"})
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
});


function App() {
    return (
        <main>
            <AppBar position={"static"}>Find Movies</AppBar>
            <ApolloProvider client={client} >
                <Search />
            </ApolloProvider>


        </main>

    );
}

export default App;

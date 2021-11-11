import './App.css';
import {AppBar, Grid, Link} from "@mui/material";
import Search from "./components/Search/Search";
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import {Route, Routes} from "react-router-dom";
import ListContainer from "./components/ListContainer/ListContainer";
import MovieDetailsContainer from "./components/MovieDetailsContainer/MovieDetailsContainer";

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
            <AppBar position={"static"}>
                <Link href={"/"} underline={"none"} variant={"h6"} color={"white"} padding={2}>
                    Find Movies
                </Link>
            </AppBar>
            <Grid container>
                <Grid item xs={3}/>
                <Grid item xs={6}>
                    <Search/>
                    <Routes>
                        <Route path={"/search"} element={
                            <ApolloProvider client={client}>
                                <ListContainer/>
                            </ApolloProvider>}
                        />
                        <Route path={"/movie/:movieSearchParams"} element={<MovieDetailsContainer/>}/>
                    </Routes>
                </Grid>
                <Grid item xs={3}/>
            </Grid>


        </main>

    );
}

export default App;

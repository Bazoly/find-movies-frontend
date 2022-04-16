import React from 'react';
import './App.css';
import {AppBar, Grid, Link} from "@mui/material";
import Search from "./components/Search/Search";
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from "@apollo/client";
import {Route, Routes} from "react-router-dom";
import ListContainer from "./components/ListContainer/ListContainer";
import MovieDetailsContainer from "./components/MovieDetailsContainer/MovieDetailsContainer";

const TMDB_GRAPHQL_URL = "https://tmdb.sandbox.zoosh.ie/dev/graphql";

const link = createHttpLink({
    uri: TMDB_GRAPHQL_URL,
})

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
                        <Route path={"/movie/:movieTitle/:movieReleaseDate"} element={<MovieDetailsContainer/>}/>
                        <Route path={"/"} element={<h1>Welcome to the Find Movies!</h1>}/>
                    </Routes>
                </Grid>
                <Grid item xs={3}/>
            </Grid>


        </main>

    );
}

export default App;

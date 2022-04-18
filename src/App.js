import React, { useEffect, useState } from "react";

import Movie from "./Components/Movie";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page-1";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setsearchTerm] = useState('');

    useEffect(() => {
        getmovies(FEATURED_API);
    }, [])

    const getmovies = (API) => {
        fetch(API).then(res => res.json())
            .then(data => {
                console.log(data);
                setMovies(data.results);
            });
    }

    const handelonsubmit = (e) => {
        e.preventDefault();

        if (searchTerm) {
            getmovies(SEARCH_API + searchTerm);
            fetch(SEARCH_API + searchTerm).then(res => res.json())
                .then(data => {
                    console.log(data);
                    setMovies(data.results);
                });

            setsearchTerm("");
        }


    }

    const handelonchange = (e) => {
        setsearchTerm(e.target.value);
    }

    return (
        <>
            <form onSubmit={handelonsubmit}>
                <header>
                    <h2 className="header-H1">MY MOVIE API</h2>
                    <input
                        className="search"
                        type="search"
                        placeholder="search..."
                        value={searchTerm}
                        onChange={handelonchange}
                    />
                </header>
            </form>
            <div className="movie-container">
                {movies.length > 0 && movies.map(movie => (
                    <Movie key={movie.id} {...movie} />
                ))}
            </div>
        </>
    );
}

export default App;

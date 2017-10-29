// Core
import React, { Component } from 'react';

// Instruments
import { Link } from 'react-router-dom';
// Modules

export default class Favorites extends Component {

    // componentWillUpdate (nextProps, nextState) {
    //     const { favoriteMovies } = nextProps;

    //     localStorage.setItem('favorites', JSON.stringify(favoriteMovies));
    // }


    render () {
        const { favoriteMovies } = this.props;
        const favoriteMoviesList = favoriteMovies.map(({ movieId, title, poster }) => (
            <div key = { movieId }>
                <img alt = { title } src = { `https://image.tmdb.org/t/p/w75${poster}` } />
                <p>{ title }</p>
                <Link to = { `/${movieId}` }>info</Link>

            </div>
             
             
        ));

        return (
            <section>
                { favoriteMoviesList } 
            </section>
        );
    }
}
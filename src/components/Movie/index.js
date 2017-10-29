// Core
import React, { Component } from 'react';

// Instruments
import { string, func, number } from 'prop-types';
import { Link } from 'react-router-dom';

// Components

export default class Movie extends Component {

    static propTypes = {
        addToFavorites: func.isRequired,
        movieId:        number.isRequired,
        poster:         string.isRequired,
        title:          string.isRequired
    }

    constructor () {
        super();
        this.handleAddToFavorites = ::this._handleAddToFavorites;
    }

    _handleAddToFavorites () {
        const { addToFavorites, movieId, title, poster } = this.props;
        const favoriteMovie = { movieId, title, poster };

        addToFavorites(favoriteMovie);

    }


    render () {

        const { title, poster, movieId } = this.props;

        return (
            <section>
                <h3>{ title }
                    <Link to = { `/${movieId}` }>Info</Link>
                </h3>

                <img alt = 'movie poster' src = { `https://image.tmdb.org/t/p/w150${poster}` } />
                <button onClick = { this.handleAddToFavorites }>add to fav</button>
            </section>
        );
    }
}

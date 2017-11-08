// Core
import React, { Component } from 'react';

// Instruments
import { array, func } from 'prop-types';
import Styles from './styles.scss';

// Modules
import FavoriteMovie from '../FavoriteMovie';

export default class Favorites extends Component {

    static propTypes = {
        deleteFromFavorites: func.isRequired,
        favoriteMovies:      array.isRequired
    }

    constructor () {
        super();
        this.deleteFromFavorites = ::this._deleteFromFavorites;
    }

    state = {
        favorites: []
    }

    _deleteFromFavorites (movieId) {
        const { deleteFromFavorites } = this.props;

        deleteFromFavorites(movieId);
    }

    render () {
        const { favoriteMovies } = this.props;
        const favoriteMoviesList = favoriteMovies.map(({ movieId, title, poster, voteAverage, releaseDate }) => (

            <FavoriteMovie
                deleteFromFavorites = { this.deleteFromFavorites }
                key = { movieId }
                movieId = { movieId }
                poster = { poster }
                releaseDate = { releaseDate }
                title = { title }
                voteAverage = { voteAverage }
            />

        ));

        return (
            <section className = { Styles.favorites }>
                { favoriteMoviesList }
            </section>
        );
    }
}

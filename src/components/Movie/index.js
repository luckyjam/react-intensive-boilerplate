// Core
import React, { Component } from 'react';

// Instruments
import { string, func, number, array, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import Styles from './styles.scss';
import moment from 'moment';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

export default class Movie extends Component {

    static propTypes = {
        addToFavorites:      func.isRequired,
        deleteFromFavorites: func.isRequired,
        genreNames:          array.isRequired,
        isInFavoritesValue:  bool.isRequired,
        movieId:             number.isRequired,
        overview:            string.isRequired,
        poster:              string.isRequired,
        releaseDate:         string.isRequired,
        title:               string.isRequired,
        voteAverage:         number.isRequired
    }

    constructor () {
        super();
        this.addToFavorites = ::this._addToFavorites;
        this.deleteFromFavorites = ::this._deleteFromFavorites;
        this.handleMovieAppear = ::this._handleMovieAppear;
    }

    _handleMovieAppear (movie) {
        fromTo(movie, 1, { opacity: 0 }, { opacity: 1 });
    }

    _addToFavorites () {
        const { addToFavorites, movieId, title, poster, voteAverage, releaseDate } = this.props;
        const inFavorites = true;
        const favoriteMovie = { movieId, title, poster, inFavorites, voteAverage, releaseDate };

        addToFavorites(favoriteMovie);

    }

    _deleteFromFavorites () {
        const { movieId, deleteFromFavorites } = this.props;

        deleteFromFavorites(movieId);

    }


    render () {
        const { title, poster, movieId, genreNames, isInFavoritesValue, voteAverage, overview, releaseDate } = this.props;
        let favoriteButton = null;

        if (!isInFavoritesValue) {
            favoriteButton = <span className = { Styles.favoriteAdd } onClick = { this.addToFavorites } />;
        } else {
            favoriteButton = <span className = { Styles.favoriteDel } onClick = { this.deleteFromFavorites } />;
        }

        return (
            <Transition
                appear
                in
                timeout = { 1000 }
                onEnter = { this.handleMovieAppear }>
                <div className = { Styles.movie }>
                    <div className = { Styles.poster }>
                        <img alt = 'movie poster' src = { poster } />
                    </div>

                    <div className = { Styles.content } >
                        <Link to = { `/${movieId}` }>
                            <h3>{ title }</h3>
                        </Link>
                        <p className = { Styles.star }>{ voteAverage !== 0? voteAverage : 'No rating'} <i className = 'material-icons'>star</i></p>
                        <p>{ moment(releaseDate).format('ll') }</p>
                        <p>{ genreNames.join(', ') }</p>
                        <p>{ overview }</p>
                        { favoriteButton }
                    </div>
                </div>
            </Transition>
        );
    }
}

// Core
import React, { Component } from 'react';

// Instruments
import { string, func, number, array, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import Styles from './styles.scss';

// Components

export default class Movie extends Component {

    static propTypes = {
        addToFavorites:     func.isRequired,
        genreNames:         array.isRequired,
        isInFavoritesValue: bool.isRequired,
        movieId:            number.isRequired,
        overview:           string.isRequired,
        poster:             string.isRequired,
        releaseDate:        string.isRequired,
        title:              string.isRequired,
        voteAverage:        number.isRequired
    }

    constructor () {
        super();
        this.addToFavorites = ::this._addToFavorites;
    }

    // state = {
    //     addedToFavorites: false
    // }

    // componentWillMount () {
    //     const { isInFavorites, movieId } = this.props;
    //     const checkInFavorites = isInFavorites(movieId);

    //     this.setState(() => ({ addedToFavorites: checkInFavorites }));

    // }

    _addToFavorites () {
        const { addToFavorites, movieId, title, poster } = this.props;
        const inFavorites = true;
        const favoriteMovie = { movieId, title, poster, inFavorites };

        this.setState(() => ({ addedToFavorites: true }));
        addToFavorites(favoriteMovie);

    }


    render () {

        const { title, poster, movieId, genreNames, isInFavoritesValue, voteAverage, overview, releaseDate } = this.props;
        let favoriteButton = null;

        if (!isInFavoritesValue) {
            favoriteButton = <button onClick = { this.addToFavorites }>add to fav</button>;
        } else {
            favoriteButton = <button>x</button>;
        }

        return (
            <div className = { Styles.movie }>
                <div>
                    <img alt = 'movie poster' src = { poster } />
                </div>

                <div className = { Styles.content } >
                    <h4>{ voteAverage }</h4>
                    <Link to = { `/${movieId}` }>
                        <h3>{ title }</h3>
                    </Link>
                    <p>{ releaseDate }</p>
                    <p>{ genreNames.join(' ') }</p>
                    <p>{ overview }</p>
                    { favoriteButton }
                </div>
            </div>
        );
    }
}

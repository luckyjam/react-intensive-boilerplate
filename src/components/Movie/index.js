// Core
import React, { Component } from 'react';

// Instruments
import { string, func, number, array, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import Styles from './styles.scss';
import { getRandomColor } from '../../helpers';
import moment from 'moment';

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

    state = {
        movieBorderColor: '#000'
    }

    _addToFavorites () {
        const { addToFavorites, movieId, title, poster } = this.props;
        const inFavorites = true;
        const favoriteMovie = { movieId, title, poster, inFavorites };

        // this.setState(() => ({ addedToFavorites: true }));
        this.setState(() => ({ movieBorderColor: getRandomColor() }));
        addToFavorites(favoriteMovie);

    }


    render () {
        const { movieBorderColor } = this.state;
        const { title, poster, movieId, genreNames, isInFavoritesValue, voteAverage, overview, releaseDate } = this.props;
        let favoriteButton = null;

        if (!isInFavoritesValue) {
            favoriteButton = <button onClick = { this.addToFavorites }>add to fav</button>;
        } else {
            favoriteButton = <button disabled>x</button>;
        }

        return (
            <div className = { Styles.movie }>
                <div>
                    <img alt = 'movie poster' src = { poster } style = { { borderColor: movieBorderColor, border: '3px solid' } } />
                </div>

                <div className = { Styles.content } >
                    <h4>{ voteAverage }</h4>
                    <Link to = { `/${movieId}` }>
                        <h3>{ title }</h3>
                    </Link>
                    <p>{ moment(releaseDate).format('ll') }</p>
                    <p>{ genreNames.join(' ') }</p>
                    <p>{ overview }</p>
                    { favoriteButton }
                </div>
            </div>
        );
    }
}

// Core
import React, { Component } from 'react';

// Instruments
import { string, number, func } from 'prop-types';
import { Link } from 'react-router-dom';
import Styles from './styles.scss';
import moment from 'moment';

export default class FavoriteMovie extends Component {

    static propTypes = {
        deleteFromFavorites: func.isRequired,
        movieId:             number.isRequired,
        poster:              string.isRequired,
        title:               string.isRequired
    }

    constructor () {
        super();
        this.deleteFromFavorites = ::this._deleteFromFavorites;
    }

    _deleteFromFavorites () {
        const { deleteFromFavorites, movieId } = this.props;

        deleteFromFavorites(movieId);

    }

    render () {
        const { movieId, poster, title, voteAverage, releaseDate } = this.props;

        return (
            <div className = { Styles.favorite } key = { movieId }>
                <div>
                    <Link to = { `/${movieId}` }>
                        <img alt = { title } src = { poster } />
                    </Link>
                </div>
                <div className = { Styles.favoriteCont }>
                    <p><Link to = { `/${movieId}` }>{ title }</Link></p>
                    <p>{ moment(releaseDate).format('Y') }</p>
                    <p><strong>Rating:</strong> { voteAverage !== 0 ? voteAverage : 'no rating' }</p>

                    <span className = { Styles.deleteCross } onClick = { this.deleteFromFavorites } />
                </div>
            </div>
        );
    }
}

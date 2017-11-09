// Core
import React, { Component } from 'react';

// Instruments
import { string, number, func } from 'prop-types';
import { Link } from 'react-router-dom';
import Styles from './styles.scss';
import moment from 'moment';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

export default class FavoriteMovie extends Component {

    static propTypes = {
        deleteFromFavorites: func.isRequired,
        movieId:             number.isRequired,
        poster:              string.isRequired,
        releaseDate:         string.isRequired,
        title:               string.isRequired,
        voteAverage:         number.isRequired
    }

    constructor () {
        super();
        this.deleteFromFavorites = ::this._deleteFromFavorites;
        this.handleFavoriteAppear = ::this._handleFavoriteAppear;
    }

    _deleteFromFavorites () {
        const { deleteFromFavorites, movieId } = this.props;

        deleteFromFavorites(movieId);

    }

    _handleFavoriteAppear (favorite) {
        fromTo(favorite, 1, { opacity: 0 }, { opacity: 1 });
    }

    render () {
        const { movieId, poster, title, voteAverage, releaseDate } = this.props;

        return (
            <Transition
                appear
                in
                timeout = { 1000 }
                onEnter = { this.handleFavoriteAppear }>
                <div className = { Styles.favorite } key = { movieId }>
                    <div>
                        <Link to = { `/${movieId}` }>
                            <img alt = { title } src = { poster } />
                        </Link>
                    </div>
                    <div className = { Styles.favoriteCont }>
                        <h3><Link to = { `/${movieId}` }>{ title }</Link></h3>
                        <p><strong>Year:</strong> { moment(releaseDate).format('Y') }</p>
                        <p><strong>Rating:</strong> { voteAverage !== 0 ? voteAverage : 'no rating' }</p>
                        <span className = { Styles.deleteCross } onClick = { this.deleteFromFavorites } />
                    </div>
                </div>
            </Transition>
        );
    }
}

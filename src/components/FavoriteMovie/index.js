// Core
import React, { Component } from 'react';

// Instruments
import { string, number, func } from 'prop-types';
import { Link } from 'react-router-dom';

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
        const { movieId, poster, title } = this.props;

        return (
            <div key = { movieId }>
                <img alt = { title } src = { poster } />
                <p>{ title }</p>
                <p><Link to = { `/${movieId}` }>info</Link></p>
                <button onClick = { this.deleteFromFavorites }>Delete</button>
            </div>
        );
    }
}

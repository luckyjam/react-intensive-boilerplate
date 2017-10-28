// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import { Link, Route } from 'react-router-dom';

// Components
import MovieInfo from '../MovieInfo';

export default class Movie extends Component {

    static propTypes = {
        poster: string.isRequired,
        title:  string.isRequired
    }


    render () {

        const { title, poster, movieId } = this.props;

        return (
            <section>
                <h3>{ title }
                    <Link to = { `/${movieId}` }>Info</Link>
                </h3>

                <img alt = 'movie poster' src = { `https://image.tmdb.org/t/p/w150${poster}` } />
                <button>add to fav</button>
            </section>
        );
    }
}

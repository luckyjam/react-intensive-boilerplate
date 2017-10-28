// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import Styles from './styles.scss';
import moment from 'moment';
// import { Switch, Route } from 'react-router-dom';


// Components
import Movie from '../Movie';
// import MovieInfo from '../MovieInfo';

export default class List extends Component {
    static contextTypes = {
        apiUrl: string.isRequired
    }

    constructor () {
        super();
        this.getMovies = ::this._getMovies;
        this.handleClickFilterNew = ::this._handleClickFilterNew;
        this.handleClickFilterPopular = ::this._handleClickFilterPopular;

    }

    state = { popularMovies: []};

    componentWillMount () {
        this.getMovies('popularity.desc');

    }

    _handleClickFilterNew () {
        const currentDate = moment().format('YYYY-MM-DD');

        this.getMovies(`release_date.desc&release_date.lte=${currentDate}`);
    }

    _handleClickFilterPopular () {

        this.getMovies('popularity.desc');

    }

    _getMovies (filter) {

        //const { filter } = this.state;
        const filterOption = filter;

        const filterUrlProperty = '&sort_by=';

        const fullApiUrl = this.context.apiUrl + filterUrlProperty + filterOption;

        fetch(fullApiUrl, {
            method: 'GET'
        })
            .then((result) => {
                if (result.status !== 200) {
                    throw new Error('Movies were not loaded');
                }

                return result.json();
            })
            .then(({ results }) => this.setState(() => ({ popularMovies: results })))
            .catch(({ message }) => console.log(message));
    }

    render () {
        const { popularMovies } = this.state;
        const popularMoviesList = popularMovies.map(({ title, poster_path: posterPath, id }) => (

            <Movie
                key = { id }
                movieId = { id }
                poster = { posterPath }
                title = { title }
            />


        ));

        return (
            <section className = { Styles.list } >
                <div>
                    <button onClick = { this.handleClickFilterPopular } >Popular Movies</button>
                    <button onClick = { this.handleClickFilterNew }>New Movies</button>
                </div>
                { popularMoviesList }
            </section>
        );
    }

}

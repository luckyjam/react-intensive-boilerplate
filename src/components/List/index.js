// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import Styles from './styles.scss';
import moment from 'moment';
// import { Switch, Route } from 'react-router-dom';


// Components
import Movie from '../Movie';
import Favorites from '../Favorites';
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
        this.addToFavorites = ::this._addToFavorites;

    }

    state = { movies: [], favorites: [] };

    componentWillMount () {
        const favoritesLocalStorage = JSON.parse(localStorage.getItem('favorites'));

        this.getMovies('popularity.desc');
        console.log(favoritesLocalStorage);
        if (favoritesLocalStorage) {
            this.setState(() => ({ favorites: favoritesLocalStorage }));
        }


    }

    componentWillUpdate (nextProps, nextState) {
        const { favorites } = nextState;

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    _handleClickFilterNew () {
        const currentDate = moment().format('YYYY-MM-DD');

        this.getMovies(`release_date.desc&release_date.lte=${currentDate}`);
    }

    _handleClickFilterPopular () {

        this.getMovies('popularity.desc');

    }

    _addToFavorites (favoriteMovie) {
        //const favoritesList = {...this.state.favorites, movieId };

        this.setState(({ favorites }) => ({ favorites: [favoriteMovie, ...favorites]}));
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
            .then(({ results }) => this.setState(() => ({ movies: results })))
            .catch(({ message }) => console.log(message));
    }

    render () {
        const { movies } = this.state;
        const { favorites } = this.state;
       
        const moviesList = movies.map(({ title, poster_path: posterPath, id }) => (

            <Movie
                addToFavorites = { this.addToFavorites }
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
                { moviesList }
                <div>
                    <Favorites
                        favoriteMovies = { favorites }
                    />
                </div>
            </section>
        );
    }

}

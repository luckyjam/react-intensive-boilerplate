// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import Styles from './styles.scss';
import moment from 'moment';
import { getFullApiUrl } from '../../helpers';
// import { Switch, Route } from 'react-router-dom';


// Components
import Movie from '../Movie';
import Favorites from '../Favorites';
import Nav from '../Nav';
// import MovieInfo from '../MovieInfo';

export default class List extends Component {

    static contextTypes = {
        apiUrl: string.isRequired,
        apiKey: string.isRequired
    }

    constructor () {
        super();
        this.getMovies = ::this._getMovies;
        this.handleClickFilterNew = ::this._handleClickFilterNew;
        this.handleClickFilterPopular = ::this._handleClickFilterPopular;
        this.addToFavorites = ::this._addToFavorites;
        this.handleClickNextPage = ::this._handleClickNextPage;
        this.handleClickPreviousPage = ::this._handleClickPreviousPage;
        this.handleClickFilterTop = ::this._handleClickFilterTop;
        this.getGenresNames = ::this._getGenresNames;
        this.genresIdsToNames = ::this._genresIdsToNames;
        this.deleteFromFavorites = ::this._deleteFromFavorites;
        this.isInFavorites = ::this._isInFavorites;

    }

    state = {
        movies:        [],
        favorites:     [],
        currentPage:   1,
        currentFilter: 'popularity.desc',
        genres:        []
    };

    componentWillMount () {
        const favoritesLocalStorage = JSON.parse(localStorage.getItem('favorites'));
        const { currentPage, currentFilter } = this.state;

        this.getGenresNames();
        this.getMovies(currentFilter, currentPage);
        if (favoritesLocalStorage) {
            this.setState(() => ({ favorites: favoritesLocalStorage }));
        }


    }

    componentWillUpdate (nextProps, nextState) {
        const { favorites } = nextState;

        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    _getGenresNames () {
        const apiGetGenresList = 'https://api.themoviedb.org/3/genre/movie/list?';
        const { apiKey } = this.context;
        const fullApiUrl = getFullApiUrl(apiGetGenresList, apiKey);

        fetch(fullApiUrl, { method: 'GET' })
            .then((result) => {
                if (result.status !== 200) {
                    throw new Error('Genres were not loaded');
                }

                return result.json();
            })
            .then(({ genres }) => {
                this.setState(() => ({ genres }));
            })
            .catch(({ message }) => console.log(message));
    }

    _handleClickFilterNew () {
        const currentDate = moment().format('YYYY-MM-DD');

        this.getMovies(`release_date.desc&release_date.lte=${currentDate}`, 1);
    }

    _handleClickFilterPopular () {

        this.getMovies('popularity.desc', 1);

    }

    _handleClickFilterTop () {

        this.getMovies('vote_average.desc', 1);

    }

    _addToFavorites (favoriteMovie) {
        //const favoritesList = {...this.state.favorites, movieId };

        this.setState(({ favorites }) => ({ favorites: [favoriteMovie, ...favorites]}));
    }

    _deleteFromFavorites (movieId) {
        this.setState(({ favorites }) => ({ favorites: favorites.filter((movie) => movie.movieId !== movieId) }));
    }

    _handleClickNextPage () {
        const { currentPage, currentFilter } = this.state;
        const nextPage = currentPage + 1;

        this.getMovies(currentFilter, nextPage);
        window.scrollTo(0, 0);
    }

    _handleClickPreviousPage () {
        const { currentPage, currentFilter } = this.state;
        const previousPage = currentPage - 1;

        // this.setState(() => ({ currentPage: previousPage }));
        this.getMovies(currentFilter, previousPage);
        window.scrollTo(0, 0);

    }

    _genresIdsToNames (genresIds) {
        const { genres } = this.state;
        const genresNames = [];

        for (const genreId of genresIds) {
            for (const genreObj of genres) {
                if (genreObj.id === genreId) {
                    genresNames.push(genreObj.name);
                }
            }
        }

        return genresNames;
    }

    _isInFavorites (movieId) {
        const { favorites } = this.state;

        for (const movie of favorites) {
            if (movie.movieId === movieId) {

                return true;
            }
        }

        return false;
    }

    _getMovies (filter, nextPage) {

        const filterAndPage = `&sort_by=${filter}&page=${nextPage}`;
        const apiUrl = this.context.apiUrl;
        const key = this.context.apiKey;
        const fullApiUrl = getFullApiUrl(apiUrl, key, filterAndPage);

        fetch(fullApiUrl, {
            method: 'GET'
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Movies were not loaded');
                }

                return response.json();
            })
            .then(({ page, results }) =>
                this.setState(() => ({
                    movies:        results,
                    currentPage:   page,
                    currentFilter: filter
                })))
            .catch(({ message }) => console.log(message));
    }

    render () {
        const { movies, favorites } = this.state;
        const posterUrl = 'https://image.tmdb.org/t/p/w150';
        const placeholderImg = 'http://via.placeholder.com/150x220';

        const moviesList = movies.map(({
            title,
            poster_path: posterPath,
            id,
            overview,
            release_date: releaseDate,
            genre_ids: genreIds,
            vote_average: voteAverage
        }) => (

            <Movie
                addToFavorites = { this.addToFavorites }
                genreNames = { this.genresIdsToNames(genreIds) }
                isInFavorites = { this.isInFavorites }
                isInFavoritesValue = { this.isInFavorites(id) }
                key = { id }
                movieId = { id }
                overview = { overview }
                poster = { posterPath ? posterUrl + posterPath : placeholderImg }
                releaseDate = { releaseDate }
                title = { title }
                voteAverage = { voteAverage }
            />


        ));

        return (

            <section>
                <Nav
                    handleClickFilterNew = { this.handleClickFilterNew }
                    handleClickFilterPopular = { this.handleClickFilterPopular }
                    handleClickFilterTop = { this.handleClickFilterTop }
                />
                <div className = { Styles.list }>
                    { moviesList }
                </div>
                <div>
                    <button
                        hidden = { !(this.state.currentPage > 1) }
                        onClick = { this.handleClickPreviousPage }>
                        PREVIOUS PAGE
                    </button>
                    <button onClick = { this.handleClickNextPage }>
                        NEXT PAGE
                    </button>
                </div>
                <h3>Favorite movies</h3>
                <div className = { Styles.favoritesList }>
                    <Favorites
                        deleteFromFavorites = { this.deleteFromFavorites }
                        favoriteMovies = { favorites }
                    />
                </div>
            </section>
        );
    }

}

// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import Styles from './styles.scss';
import moment from 'moment';
import { getFullApiUrl } from '../../helpers';


// Components
import Movie from '../Movie';
import Favorites from '../Favorites';
import Nav from '../Nav';

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
        this.handleClickFilterTop = ::this._handleClickFilterTop;
        this.addToFavorites = ::this._addToFavorites;
        this.handleClickFavoritesList = ::this._handleClickFavoritesList;
        this.handleClickNextPage = ::this._handleClickNextPage;
        this.handleClickPreviousPage = ::this._handleClickPreviousPage;
        this.getGenresNames = ::this._getGenresNames;
        this.genresIdsToNames = ::this._genresIdsToNames;
        this.deleteFromFavorites = ::this._deleteFromFavorites;
        this.isInFavorites = ::this._isInFavorites;

    }

    state = {
        movies:        [],
        favorites:     [],
        currentPage:   1,
        currentFilter: '',
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

    _handleClickFavoritesList () {
        this.setState(() => ({ currentFilter: 'favorites' }));
    }

    _addToFavorites (favoriteMovie) {
        this.setState(({ favorites }) => ({ favorites: [favoriteMovie, ...favorites]}));
    }

    _deleteFromFavorites (movieId) {
        this.setState(({ favorites }) => ({ favorites: favorites.filter((movie) => movie.movieId !== movieId) }));
    }

    _handleClickNextPage () {
        const { currentPage, currentFilter } = this.state;
        const nextPage = currentPage + 1;

        this.getMovies(currentFilter, nextPage);
    }

    _handleClickPreviousPage () {
        const { currentPage, currentFilter } = this.state;
        const previousPage = currentPage - 1;

        this.getMovies(currentFilter, previousPage);
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
        const { movies, favorites, currentFilter, currentPage } = this.state;
        const posterUrl = 'https://image.tmdb.org/t/p/w300';
        const placeholderImg = 'http://via.placeholder.com/300x420';

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
                deleteFromFavorites = { this.deleteFromFavorites }
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

        const favoritesOrMoviesRender = currentFilter === 'favorites'? (
            <Favorites
                deleteFromFavorites = { this.deleteFromFavorites }
                favoriteMovies = { favorites }
            />
        ):(
            <div className = { Styles.list }> { moviesList } </div>
        );

        return (

            <section>
                <Nav
                    handleClickFavoritesList = { this.handleClickFavoritesList }
                    handleClickFilterNew = { this.handleClickFilterNew }
                    handleClickFilterPopular = { this.handleClickFilterPopular }
                    handleClickFilterTop = { this.handleClickFilterTop }
                />
                { favoritesOrMoviesRender }
                <div className = { Styles.pagination } >
                    <button
                        hidden = { !(currentPage > 1) || currentFilter === 'favorites' }
                        onClick = { this.handleClickPreviousPage }>
                        {'< '}PREVIOUS PAGE
                    </button>
                    <button hidden = { currentFilter === 'favorites' } onClick = { this.handleClickNextPage }>
                        NEXT PAGE{' >'}
                    </button>
                </div>
            </section>
        );
    }

}

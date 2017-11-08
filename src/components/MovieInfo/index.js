// Core
import React, { Component } from 'react';

// Instruments
import { Link } from 'react-router-dom';
import { string, object } from 'prop-types';
import Styles from './styles.scss';

export default class MovieInfo extends Component {

    static contextTypes = {
        apiKey: string.isRequired
    }

    static propTypes = {
        match: object.isRequired
    }

    constructor () {
        super();
        this.getMovieInfo = ::this._getMovieInfo;
    }

    state = {
        movieInfo: []
    };

    componentWillMount () {
        this.getMovieInfo();
    }

    _getMovieInfo () {
        const { movieId } = this.props.match.params;
        const { apiKey } = this.context;
        const appendToRequest = '&append_to_response=videos,images,credits';
        const fullApiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}${appendToRequest}`;

        fetch(fullApiUrl, { method: 'GET' })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Movie was not loaded');
                }

                return response.json();

            })
            .then((result) => {
                this.setState(() => ({ movieInfo: result }));
            })
            .catch((message) => console.log(message));
    }

    render () {
        const { 
            backdrop_path: backdrop, 
            budget, 
            credits, 
            genres, 
            homepage, 
            images, 
            title, 
            overview,
            tagline, 
            videos, 
            vote_average: voteScore 
        } = this.state.movieInfo;
        const placeholderPoster = 'http://via.placeholder.com/300x620';
        const placeholderActorPhoto = 'http://via.placeholder.com/45x65';
        let poster = '';
        let creditsAll = '';
        let genresAll = [];

        if (title) {
            if (images.posters[1]) {
                poster = images.posters[1].file_path;
            } else if (images.posters[0]) {
                poster = images.posters[0].file_path;
            }
            creditsAll = credits.cast.map(({ name, character, profile_path: profilePath, cast_id: castId }, key) => (
                <div key = { castId }>
                    <h3>{name}</h3>
                    <p>{character}</p>
                    <img src = { profilePath ? `http://image.tmdb.org/t/p/w45${profilePath}` : placeholderActorPhoto } />
                </div>
            ));
            genresAll = genres.map((genre) => genre.name);

        }

        const result = title ? (
            <section>
                <div className = { Styles.movieInfo }>
                    <div className = { Styles.poster }>
                        <img src = { poster ? `http://image.tmdb.org/t/p/w300${poster}` : placeholderPoster } />
                    </div>
                    <div className = { Styles.content }>
                        <h1>{ title }</h1>
                        <h3>{ tagline }</h3>
                        <p><strong>Overview:</strong> { overview }</p>
                        <p><strong>Genres:</strong> {genresAll.join(', ')}</p>
                        <p><strong>Budget:</strong> {budget !== 0 ? `${budget.toLocaleString()}$` : 'unknown'}</p>
                        <p><strong>Homepage:</strong> <a href = { homepage }>{homepage}</a></p>
                        <p><strong>User rating:</strong> { `${voteScore}` }</p> 
                        <Link to = '/'><button>Back</button></Link>
                    </div>
                </div>
                <div className = { Styles.cast }>
                    {creditsAll}
                </div>
            </section>
        ) : (
            <h1>Loading...</h1>
        );

        return result;
    }
}

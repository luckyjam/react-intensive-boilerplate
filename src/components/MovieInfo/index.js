// Core
import React, { Component } from 'react';

// Instruments
import { Link } from 'react-router-dom';
import { string, object } from 'prop-types';

// Components
// import Cast from '../Cast';

export default class MovieInfo extends Component {

    static contextTypes = {
        apiKey: string.isRequired
    }

    static propTypes = {
        match:   object.isRequired,
        movieId: string.isRequired,
        params:  object.isRequired
    }

    constructor () {
        super();
        this.getMovieInfo = ::this._getMovieInfo;
    }

    state = {
        backdrop:  '',
        budget:    0,
        credits:   {},
        genres:    [],
        homepage:  '',
        images:    {},
        title:     '',
        tagline:   '',
        videos:    {},
        voteScore: {}
    };

    componentWillMount () {
        if (this.props.match) {
            this.getMovieInfo();
        }
    }

    _getMovieInfo () {
        const movieId = this.props.match.params.movieId;
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
            .then(({backdrop_path: backdrop, budget, credits, genres, homepage, images, title, tagline, videos, vote_average: voteScore }) => {
                this.setState(() => ({ backdrop, budget, credits, genres, homepage, images, title, tagline, videos, voteScore }));
            })
            .catch((message) => console.log(message));
    }

    render () {
        const movieId = this.props.match.params.movieId;
        const { backdrop, budget, credits, genres, homepage, images, title, tagline, videos, voteScore } = this.state;
        let poster = '';
        let creditsAll = [];
        let genresAll = [];

        if (images.posters) {
            poster = images.posters[0].file_path;
            creditsAll = credits.cast;
            genresAll = genres.map((genre) => genre.name);
        }
        console.log(typeof credits);

        return (
            <section>
                <h1>{ title }</h1>
                <img src = { `http://image.tmdb.org/t/p/w150${poster}` } />
                <h3>{ tagline }</h3>
                <p>Genres: {genresAll.join(', ')}</p>
                <p>Budget: {budget.toLocaleString()}$</p>
                <p>Homepage: <a href = { homepage }>{homepage}</a></p>
                <p>User rating: { `${voteScore}` }</p>
                <Link to = '/'>Back</Link>
                
            </section>
        );
    }
}

// Core
import React, { Component } from 'react';

// Instruments
import { Link } from 'react-router-dom';
import { string } from 'prop-types';


export default class MovieInfo extends Component {

    static contextTypes = {
        apiKey: string.isRequired
    }

    // static propTypes = {
    //     match:   string.isRequired,
    //     movieId: string.isRequired,
    //     params:  string.isRequired
    // }

    constructor () {
        super();
        this.getMovieInfo = ::this._getMovieInfo;

    }

    state = { movieInfo: {}};

    componentWillMount () {
        this.getMovieInfo();
    }

    _getMovieInfo () {
        const { movieId } = this.props.match.params;
        const { apiKey } = this.context;

        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`, { method: 'GET' })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Movie was not loaded' + response.status);
                }

                return response.json();

            })
            .then((movieData) => {
                console.log(movieData)
                this.setState(() => ({ movieInfo: movieData }));

            })
            .catch((message) => console.log(message));
    }

    render () {
        const { movieInfo } = this.state;

        return (
            <section>

                <h3>{ movieInfo.homepage }</h3>
                <Link to = '/'>Back</Link>
            </section>
        )
    }
}
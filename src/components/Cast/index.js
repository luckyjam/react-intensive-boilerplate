// Core
import React, { Component } from 'react';

// Instruments
import { string, object } from 'prop-types';

export default class Cast extends Component {

    static propTypes = {
        credits: object.isRequired,
        movieId: string.isRequired
    }

    render () {
        console.log('hi cast');
        const { movieId } = this.props;
        // const actors = credits.cast.map((actor) => actor.name)

        return (
            <section>
                <p>{movieId}</p>
            </section>
        );
    }
}
